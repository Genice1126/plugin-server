process.env.NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'localhost';
const path = require('path');
const loading_config_path = require(path.join(__dirname , process.env.NODE_ENV));
const common_config = require('./common');
const loading_config = Object.assign(common_config , loading_config_path);

exports = module.exports = loading_config;

