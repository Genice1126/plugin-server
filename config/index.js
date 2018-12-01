const debug = require('debug')('plugin-config');
process.env.NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'localhost';
debug('插件运行环境=====>>>' , process.env.NODE_ENV);
const path = require('path');
const config_env = require(path.join(__dirname , process.env.NODE_ENV));
const common_config = require('./common');
const loading_config = Object.assign(common_config , config_env);

exports = module.exports = loading_config;

