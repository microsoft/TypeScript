//// [tests/cases/conformance/salsa/requireOfESWithPropertyAccess.ts] ////

//// [main.js]
const x = require('./ch').x
x
x.grey
x.x.grey
//// [ch.js]
const x = {
  grey: {}
}
export { x }


//// [ch.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
var x = {
    grey: {}
};
exports.x = x;
//// [main.js]
"use strict";
var x = require('./ch').x;
x;
x.grey;
x.x.grey;


//// [ch.d.ts]
export namespace x {
    const grey: {};
}
//// [main.d.ts]
export {};
