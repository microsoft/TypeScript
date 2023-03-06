//// [tests/cases/conformance/salsa/commonJSAliasedExport.ts] ////

//// [commonJSAliasedExport.js]
const donkey = (ast) =>  ast;

function funky(declaration) {
    return false;
}
module.exports = donkey;
module.exports.funky = funky;

//// [bug43713.js]
const { funky } = require('./commonJSAliasedExport');
/** @type {boolean} */
var diddy
var diddy = funky(1)



//// [commonJSAliasedExport.js]
var donkey = function (ast) { return ast; };
function funky(declaration) {
    return false;
}
module.exports = donkey;
module.exports.funky = funky;
//// [bug43713.js]
var funky = require('./commonJSAliasedExport').funky;
/** @type {boolean} */
var diddy;
var diddy = funky(1);


//// [commonJSAliasedExport.d.ts]
export = donkey;
declare function donkey(ast: any): any;
declare namespace donkey {
    export { funky };
}
declare function funky(declaration: any): boolean;
//// [bug43713.d.ts]
export {};
