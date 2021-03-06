const path = require("path");
const PORT = 8080;
const express = require("express");

express()
  .use(express.urlencoded({
    extended: true
  }))
  .use(express.static(path.resolve(__dirname, '../dist')))
  .listen(PORT, () => console.log("listening on " + PORT))
;