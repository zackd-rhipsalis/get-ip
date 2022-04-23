const path = require("path");
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();

app
  .use(express.urlencoded({
    extended: true
  }))
  .use(express.static(path.join(__dirname, 'dist')))
  .listen(PORT, () => console.log("listening on " + PORT))
;