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
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = A;
function A() { }
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var a_1 = require("./a");
Object.defineProperty(exports, "A", { enumerable: true, get: function () { return a_1.A; } });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    A.displayName = "A";
})(A || (A = {}));
A();
A.displayName;
