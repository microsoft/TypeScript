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
const x = {
    grey: {}
};
export { x };
//// [main.js]
"use strict";
const x = require('./ch').x;
x;
x.grey;
x.x.grey;


//// [ch.d.ts]
export namespace x {
    let grey: {};
}
//// [main.d.ts]
export {};
