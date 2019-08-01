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
  
