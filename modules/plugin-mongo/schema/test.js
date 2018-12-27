
const mongoose = require('mongoose');

const model = new mongoose.Schema({
  name : {type : String},
  location : {type : String}
});

exports = module.exports = model