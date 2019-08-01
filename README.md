# bootcampfinmanager
Final Project of BootCamp 2019 - Finance Portfolio Manager

# Project Organization
|--README.md
|--.gitignore       <--File that defines which files will not be uploaded to git
|--.env             <--File that contains the api keys
|--package-lock.json<--
|--package.json     <--File with dependencies and configurations
|--node_modules     <--Folder with modules installed (npm i)
|--models
   |--index.js      <--Define Schemas and export them
|--routes
   |--index.js      <--Define routes to call apis and mongodb

# Commands for Project
1) create a repo in github with readme.md
2) git clone the repo to computer.
3) in gitbash position inside the created folder from now on the created folder.
or the root folder will be referred as express folder.
4) run cmd "create-react-app client", from now on the created client folder will
be referred as the react folder.
# Configuration for the Backend (in the express folder do the following:)
5) run cmd npm init
6) install dependencies by running the following commands: 
    npm install express --save
    npm install mongoose --save
    npm install axios --save
    npm install cheerio --save
    npm install twit --save
    npm install sentiment --save
    npm install if-env --save
    npm install dotenv --save
7) create a folder called models and inside the folder create a file called index.js
and edit with the following:
    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    const portSchema = new Schema({
        stategy: { type: String, required: true},
        tickers: { type: Array, required: true },
        weights: { type: Array, required: true },
        focus: { type: Array, required: true }
    });

    const Port = mongoose.model("Port", portSchema);

    module.exports = {
        Port: Port
    };

8) create a folder called routes and inside the folder create a file called index.js 
and edit with the following: 
    const path = require("path");
    const router = require("express").Router();
    const axios = require("axios");
    const cheerio = require("cheerio");
    const Twit = require("twit");
    const Sentiment = require("sentiment");
    const db = require("../models");

    require("dotenv").config()
    var T = new Twit({
        consumer_key: twt_cns_key,
        consumer_secret: twt_cns_secret,
        access_token: twt_acs_token,
        access_token_secret: twt_acs_token_secret,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })
    var sentiment = new Sentiment();
    var frLanguage = {
        labels: {
        'sell': -2,
        'underperform': -2,
        'downgrade': -2,
        'short': -2,
        'hold': 0,
        'buy': 2,
        'upgrade':2,
        'long':2
        }
    };
    sentiment.registerLanguage('en', frLanguage);

    //if no API routes are hit, send the React App
    router.use(function(req,res){
        res.sendFile(path.join(__dirname,"..client/build/index.html"));
    });

    //API Routes

    // get tickers from alphavantage api
    router.use("/stocks/:id",function(req,res){
        ticker = req.params.id;
        axios.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + ticker + "&apikey="process.env.alpha_key)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    });

    // get stock prices from alphavantage api
    router.use("/stocks/:id",function(req,res){
        ticker = req.params.id;
        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=compact&apikey="process.env.alpha_key)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    });

    // get company news from nyt api
    router.use("/nyt/:query", function (req, res) {
        query = req.params.query;
        axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&api-key="process.env.nyt_key)
        .then((response) => {
            res.json(response.data);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    });

    // get popular tickers from reddit
    router.use("/reddit", function (req, res) {
        axios.get("https://old.reddit.com/r/Stock_Picks").then(function (response) {
        var $ = cheerio.load(response.data);
        var results = [];
        $("p.title").each(function (i, element) {
            var title = $(element).text();
            var link = $(element).children("a").attr("href");
            results.push({
                title: title,
                link: link
            });
        });
        res.json({results});
        });
    })

    // get company financial ratios from simplefinance api
    router.use("/simfin/:id", function (req, res) {
        var ticker = req.params.id;
        var compId = ""
        axios.get("https://simfin.com/api/v1/info/find-id/ticker/"+ticker+"?api-key=" + sm_key)
        .then((response) => {
            compID = response.data[0].simId;
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
        .then(axios.get("https://simfin.com/api/v1/companies/id/" + compID + "/ratios?api-key=" + sm_key)
        .then((resp) => {
            res.json(resp.data);
        })
        .catch((err) => {
            res.send(err);
        }))
    })

    //get latest tweets from twitter api and do sentiment analysis
    router.use("/twitter/:id", function (req, res) {
        var ticker = req.params.id;
        T.get('search/tweets', { q: '$' + ticker + ' since:2019-07-29', count: 100, lang: "en" }, function (err, data, response) {
        var arr = [];
        arr = data.statuses.map(twit => {
            return { sent: sentiment.analyze(twit.text), text: twit.text }
        })
        res.send(arr)
        });
    })

    //get user portfolio
    router.use("/port/:user",function(req,res){
        db.Port
            .find(req.pararms.user)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    })

    module.exports = router;

9) create a file "server.js" and edit with the following:
    const express = require("express");
    const mongoose = require("mongoose");
    const routes = require("./routes");
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    }
    
    app.use(routes);

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

    app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });


8) create a file ".env" and edit with the following:
    twt_cns_key = consumer_key from twitter
    twt_cns_secret = consumer_secret from twitter
    twt_acs_token = access_token from twitter
    twt_acs_token_secret = access_token_secret from twitter

    alpha_key = alpha vantage api key
    nyt_key = new york times api
    sm_key = simple finance api





