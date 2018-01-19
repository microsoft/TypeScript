//// [tests/cases/compiler/exportStarFromEmptyModule.ts] ////

//// [exportStarFromEmptyModule_module1.ts]
export class A {
    static r;
}

//// [exportStarFromEmptyModule_module2.ts]
// empty

//// [exportStarFromEmptyModule_module3.ts]
export * from "./exportStarFromEmptyModule_module2";
export * from "./exportStarFromEmptyModule_module1";

export class A {
    static q;
}

//// [exportStarFromEmptyModule_module4.ts]
import * as X from "./exportStarFromEmptyModule_module3";
var s: X.A;
X.A.q;
X.A.r; // Error

//// [exportStarFromEmptyModule_module1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [exportStarFromEmptyModule_module2.js]
// empty
//// [exportStarFromEmptyModule_module3.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./exportStarFromEmptyModule_module2"));
__export(require("./exportStarFromEmptyModule_module1"));
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [exportStarFromEmptyModule_module4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var X = require("./exportStarFromEmptyModule_module3");
var s;
X.A.q;
X.A.r; // Error


//// [exportStarFromEmptyModule_module1.d.ts]
export declare class A {
    static r: any;
}
//// [exportStarFromEmptyModule_module2.d.ts]
//// [exportStarFromEmptyModule_module3.d.ts]
export * from "./exportStarFromEmptyModule_module2";
export * from "./exportStarFromEmptyModule_module1";
export declare class A {
    static q: any;
}
//// [exportStarFromEmptyModule_module4.d.ts]
export {};
