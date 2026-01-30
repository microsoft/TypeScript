//// [tests/cases/conformance/salsa/nestedDestructuringOfRequire.ts] ////

//// [mod1.js]
const chalk = {
    grey: {}
};
module.exports.chalk = chalk

//// [main.js]
const {
    chalk: { grey }
} = require('./mod1');
grey
chalk


//// [mod1.js]
"use strict";
var chalk = {
    grey: {}
};
module.exports.chalk = chalk;
//// [main.js]
"use strict";
var grey = require('./mod1').chalk.grey;
grey;
chalk;


//// [mod1.d.ts]
export namespace chalk {
    let grey: {};
}
//// [main.d.ts]
export {};
