var path = require('path');
var platform = process.env.PLATFORM || 'web';

module.exports = {
    platform: path.resolve(__dirname, './src/platforms/' + platform),
    utils: path.resolve(__dirname, './src')
};
