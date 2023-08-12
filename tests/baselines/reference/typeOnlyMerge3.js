//// [tests/cases/conformance/externalModules/typeOnlyMerge3.ts] ////

//// [a.ts]
function A() {}
export type { A };

//// [b.ts]
import { A } from "./a";
namespace A {
  export const displayName = "A";
}
export { A };

//// [c.ts]
import { A } from "./b";
A;
A.displayName;
A();


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function A() { }
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A;
(function (A) {
    A.displayName = "A";
})(A || (exports.A = A = {}));
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
A;
A.displayName;
A();
