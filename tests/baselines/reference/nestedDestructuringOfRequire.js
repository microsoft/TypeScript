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
var chalk = {
    grey: {}
};
module.exports.chalk = chalk;
//// [main.js]
var grey = require('./mod1').chalk.grey;
grey;
chalk;


//// [mod1.d.ts]
export namespace chalk {
    const grey: {};
}
//// [main.d.ts]
export {};
