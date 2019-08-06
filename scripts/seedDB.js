const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/btcmpfinmgnr"
  );

  const portSeed = [
      {
       strategy: "Warren Buffet - 90 / 10 Portfolio",
       tickers: ["VOO", "BIL"],
       weights: [.90,.10],
       focus: ["US Equity Blend", "US Bonds Short Term"]   
      },
      {
        strategy: "Paul Merriman - Ultimate Buy and Hold Strategy",
        tickers: ["VOO", "DVY", "IJS", "VBR", "IYR", "VT", "VTV", "DLS", "VSS", "VWO"],
        weights: [.1,.1,.1,.1,.1,.1,.1,.1,.1,.1],
        focus: ["US Equity Blend", "US Equity Large Cap Value", "US Equity Small Cap Blend", "US Equity Small Cap Value", 
                "US Equity REITs", "INTL Equity Large Cap Blend", "INTL Equity Large Cap Value", "INTL Equity Small Cap Blend",
                "INTL Equity Small Cap Value", "EMG Equity Blend"]   
       },
       {
        strategy: "Ivy League Endowments",
        tickers: ["VOO", "BNDX", "VT", "GSG", "VNQ"],
        weights: [.35,.28,.15,.11,.11],
        focus: ["US Equity Blend", "INTL Bonds Blend", "INTL Equity Blend", "Commodities", "REITs"]   
       },
       {
        strategy: "Coffeehouse Portfolio",
        tickers: ["BNDX", "VT", "VTV", "DLS", "VSS", "ACWI", "VNQ"],
        weights: [.4,.1,.1,.1,.1,.1,.1],
        focus: ["INTL Bonds Blend", "INTL Equity Large Cap Blend", "INTL Equity Large Cap Value", "INTL Equity Small Cap Blend",
                "INTL Equity Small Cap Value", "INTL Equity Blend", "REITs"]   
       },
       {
        strategy: "Bill Bernstein's No Brainer Portfolio",
        tickers: ["BNDX", "VGK", "VBR", "VOO"],
        weights: [.25,.25,.25,.25],
        focus: ["INTL Bonds Blend", "EU Equity Blend", "US Equity Small Cap Blend", "US Equity Blend"]   
       },
       {
        strategy: "Harry Browne's Permanent Portfolio",
        tickers: ["VGLT", "BIL", "VOO", "GLD"],
        weights: [.25, .25, .25, .25],
        focus: ["US Bonds Long Term", "US Bonds Short Term", "US Equity Blend", "Gold"]   
       }
  ]

  db.Port
  .remove({})
  .then(() => db.Port.collection.insertMany(portSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


