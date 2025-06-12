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
const chalk = {
    grey: {}
};
module.exports.chalk = chalk;
//// [main.js]
const { chalk: { grey } } = require('./mod1');
grey;
chalk;


//// [mod1.d.ts]
export namespace chalk {
    let grey: {};
}
//// [main.d.ts]
export {};
