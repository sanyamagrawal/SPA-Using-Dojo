var express = require("express");
//Mogran is used for Logging Info In Terminal
var morgan = require("morgan");

var app = express();

// Serve up content from public directory
app.use(express.static(__dirname));
//Start Logging
app.use(morgan("short"));

app.listen(process.env.PORT || 3000, function() {
    console.log("<!--Server Started AT PORT 3000-->");
});