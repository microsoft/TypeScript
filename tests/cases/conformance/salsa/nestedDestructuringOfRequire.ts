// @allowJs: true
// @checkJs: true
// @outDir: out
// @declaration: true

// @filename: mod1.js
const chalk = {
    grey: {}
};
module.exports.chalk = chalk

// @filename: main.js
const {
    chalk: { grey }
} = require('./mod1');
grey
chalk
