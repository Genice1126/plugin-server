process.env.NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'localhost';
const debug = require('debug')('plugin-config');
const path = require('path');
const common_config = require('./common');
debug('插件运行环境=====>>>' , process.env.NODE_ENV);
const config_env = require(path.join(__dirname , process.env.NODE_ENV));
const loading_config = Object.assign(common_config , config_env);
exports = module.exports = loading_config;

