//// [tests/cases/compiler/mergedAliases.ts] ////

//// [a.ts]

export class A {
    static M: number;
}

//// [b.ts]
import {A} from  "./a";
namespace A {
    export interface I { }
}
var x: A.I;
var y = A.M;
export = A;

//// [c.ts]
import * as B from "./b";
var x: B.I;
var y = B.M;


//// [a.js]
"use strict";
var A = (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
var a_1 = require("./a");
var x;
var y = a_1.A.M;
module.exports = a_1.A;
//// [c.js]
"use strict";
var B = require("./b");
var x;
var y = B.M;


//// [a.d.ts]
export declare class A {
    static M: number;
}
//// [b.d.ts]
import { A } from "./a";
declare namespace A {
    interface I {
    }
}
export = A;
//// [c.d.ts]
