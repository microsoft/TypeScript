//// [tests/cases/compiler/multipleModuleExportsAssignments.ts] ////

//// [x.js]
if (!!true) {
    module.exports = { a: 1 };
}
else {
    module.exports = { b: "hello" };
}
//// [y.js]
const x = require("./x");
const a = x.a;
const b = x.b;


//// [x.js]
"use strict";
if (!!true) {
    module.exports = { a: 1 };
}
else {
    module.exports = { b: "hello" };
}
//// [y.js]
"use strict";
const x = require("./x");
const a = x.a;
const b = x.b;


//// [x.d.ts]
export {};
//// [y.d.ts]
export {};
