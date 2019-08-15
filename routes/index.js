require("dotenv").config()
const path = require("path");
const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Twit = require("twit");
const Sentiment = require("sentiment");
const db = require("../models");
const accountSid = process.env.TWILIO_accountSid;
const authToken = process.env.TWILIO_authToken;
const client = require('twilio')(accountSid, authToken);

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

function random(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

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
    var compID = ""
    axios.get("https://simfin.com/api/v1/info/find-id/ticker/" + ticker + "?api-key=" + process.env.sm_key)
        .then((response) => {
            compID = response.data[0].simId;
            console.log(response.data[0].simId);
            axios.get("https://simfin.com/api/v1/companies/id/" + compID + "/ratios?api-key=" + process.env.sm_key)
                .then((resp) => {
                    console.log("segundo then", compID);
                    res.json(resp.data);
                })
                .catch((err) => {
                    console.log("catch");
                    res.send(err);
                })

        })
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

//send menssages 
router.post("/twilio", function (req, res) {
    console.log(req.body);
    phoneto = "+521" + req.body.celular;
    console.log(phoneto);
    x = random(req.body.celular);
    console.log(x);
    msgbnv = "Bienvenido/a " + req.body.nombre + " tu clave dinamica es "+ Math.floor(x*9999);
    client.messages
        .create({
            body: msgbnv,
            from: '+18153907997',
            to: phoneto
        })
        .then(message => {
            console.log(message.sid)
            res.json({ status: "success" })
        }
        ).catch(
            err => {

                res.json({ status: "error", msg: err })
            }
        );
})


//get user portfolio from mondodb
router.use("/portstrategies/", function (req, res) {
    console.log("llamada de portafolios");
    db.Port
        .find({})
        .then(dbModel => {
            console.log("despues del then");
            res.json(dbModel)

        })
        .catch(err => {
            console.log("catch")
            res.status(422).json(err)
        });
})

//get formated ports from mondodb
router.use("/portform/:strategy", function (req, res) {
    console.log(req.params.strategy);
    db.Port
        .find({"strategy" : req.params.strategy})
        .then(dbModel =>{
            console.log("busqueda de portafolio");
            console.log(dbModel)
            const data = [];
            for (let i = 0; i < dbModel[0].tickers.length; i++) {
                data.push({
                    ticker: dbModel[0].tickers[i],
                    weights: dbModel[0].weights[i],
                    focus: dbModel[0].focus[i]
                })
            }
            res.json({
                columns: [
                    { title: 'Ticker', field: 'ticker' },
                    { title: 'Weights', field: 'weights', type: 'numeric' },
                    { title: 'Focus', field: 'focus' },
                ],
                data: data,
            })
        })
        .catch(err => {
            console.log("catch")
            res.status(422).json(err)
        });
})


// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;