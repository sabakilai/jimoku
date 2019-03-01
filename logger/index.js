const path = require('path');
const appDir = path.dirname(require.main.filename);
const log = require('simple-node-logger').createSimpleLogger('/cs/home/bb78/Documents/gymoccu/jimoku/logger/logs/project.log');

module.exports = log;