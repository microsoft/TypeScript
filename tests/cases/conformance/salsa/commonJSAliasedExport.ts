// @checkJs: true
// @outdir: out/
// @declaration: true
// @Filename: commonJSAliasedExport.js
const donkey = (ast) =>  ast;

function funky(declaration) {
    return false;
}
module.exports = donkey;
module.exports.funky = funky;

// @Filename: bug43713.js
const { funky } = require('./commonJSAliasedExport');
/** @type {boolean} */
var diddy
var diddy = funky(1)

