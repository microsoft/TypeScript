//// [tests/cases/conformance/externalModules/valuesMergingAcrossModules.ts] ////

//// [a.ts]
function A() {}
export { A };

//// [b.ts]
import { A } from "./a";
type A = 0;
export { A };

//// [c.ts]
import { A } from "./b";
namespace A {
  export const displayName = "A";
}

A();
A.displayName;


//// [a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
function A() { }
exports.A = A;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var a_1 = require("./a");
exports.A = a_1.A;
//// [c.js]
"use strict";
exports.__esModule = true;
var A;
(function (A) {
    A.displayName = "A";
})(A || (A = {}));
A();
A.displayName;
