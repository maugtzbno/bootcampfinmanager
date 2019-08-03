const path = require("path");
const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Twit = require("twit");
const Sentiment = require("sentiment");
const db = require("../models");

require("dotenv").config()

var T = new Twit({
    consumer_key: process.env.twt_cns_key,
    consumer_secret: process.env.twt_cns_secret,
    access_token: process.env.twt_acs_token,
    access_token_secret: process.env.twt_acs_token_secret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})
var sentiment = new Sentiment();
var frLanguage = {
    labels: {
        'sell': -2,
        'sells': -2,
        'down': -2,
        'trouble': -2,
        'sold': -2,
        'underperform': -2,
        'downgrade': -2,
        'short': -2,
        'bearish': -1,
        'hold': 0,
        'buy': 2,
        'upgrade': 2,
        'long': 2,
        'bullish': 2,
        'beat': 2
    }
};
sentiment.registerLanguage('en', frLanguage);

//API Routes

// get tickers from alphavantage api
router.use("/stocks/:id", function (req, res) {
    ticker = req.params.id;
    axios.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + ticker + "&apikey=" + process.env.alpha_key)
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
router.use("/prices/:id", function (req, res) {
    ticker = req.params.id;
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=compact&apikey=" + process.env.alpha_key)
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
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&api-key=" + process.env.nyt_key)
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
        res.json({ results });
    });
})

// get company financial ratios from simplefinance api
router.use("/simfin/:id", function (req, res) {
    var ticker = req.params.id;
    var compId = ""
    axios.get("https://simfin.com/api/v1/info/find-id/ticker/" + ticker + "?api-key=" + process.env.sm_key)
        .then((response) => {
            compID = response.data[0].simId;
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
        .then(axios.get("https://simfin.com/api/v1/companies/id/" + compID + "/ratios?api-key=" + process.env.sm_key)
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
            return { sent: sentiment.analyze(twit.text).score, text: twit.text }
        })
        res.send(arr);
        //res.send(data);
    });
})

//get user portfolio from mondodb
router.use("/port/:user", function (req, res) {
    db.Port
        .find(req.pararms.user)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;