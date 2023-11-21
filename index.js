const express = require('express');
const app = express();

const Doctors = require('./doctors')
app.use(Doctors);
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
  module.exports = app;
