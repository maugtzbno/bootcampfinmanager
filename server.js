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

if (process.env.NODE_ENV === "development"){
    mongoose.connect("mongodb://localhost/btcmpfinmgnr");
}
else {
    mongoose.connect(process.env.MONGODB_URI);    
}

// function sayhello(){
//     console.log("hello");
// }

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    //setInterval(sayhello,5000);
});
