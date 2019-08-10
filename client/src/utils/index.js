import axios from "axios";

export default {
    //Get all stocks
    getStocks: function(id){
        return axios.get('/stocks/'+ id)
    },
    //Get prices of stock
    getPrices: function(id){
        return axios.get('/prices/'+id)
    },
    // Get news from New York Times
    getNews: function(query){
        return axios.get('/nyt/'+query)
    },
    // Get popular stocks from reddit
    getReddit: function(){
        return axios.get('/reddit')
    },
    // Get financial ratios from simfin
    getRatios: function(id){
        return axios.get('/simfin/'+id)
    },
    // Get latest twits and sentiment analysis
    getTwits: function(id){
        return axios.get('/twitter/'+id)
    },
    // Send twilio messages
    sendMsg: function(){
        return axios.get('/twilio')
    },
    // Get portfolios from MongoDB
    getPorts: function(){
        return axios.get('/portstrategies')
    },
    // Get portfolios from MongoDB
    getPortsF: function(){
        return axios.get('/portform')
    }
}
