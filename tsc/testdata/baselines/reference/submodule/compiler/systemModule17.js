//// [tests/cases/compiler/systemModule17.ts] ////

//// [f1.ts]
export class A {}
export interface I {}

//// [f2.ts]
var x = 1;
interface I { }

namespace N {
	export var x = 1;
	export interface I { }	
}

import IX = N.x;
import II = N.I;
import { A, A as EA, I as EI } from "f1";

export {x};
export {x as x1};

export {I};
export {I as I1};

export {A};
export {A as A1};

export {EA};
export {EA as EA1};

export {EI };
export {EI as EI1};

export {IX};
export {IX as IX1};

export {II};
export {II as II1};

//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IX1 = exports.IX = exports.EI1 = exports.EI = exports.EA1 = exports.EA = exports.A1 = exports.A = exports.x1 = exports.x = void 0;
var x = 1;
exports.x = x;
exports.x1 = x;
var N;
(function (N) {
    N.x = 1;
})(N || (N = {}));
const f1_1 = require("f1");
Object.defineProperty(exports, "A", { enumerable: true, get: function () { return f1_1.A; } });
Object.defineProperty(exports, "A1", { enumerable: true, get: function () { return f1_1.A; } });
Object.defineProperty(exports, "EA", { enumerable: true, get: function () { return f1_1.A; } });
Object.defineProperty(exports, "EA1", { enumerable: true, get: function () { return f1_1.A; } });
Object.defineProperty(exports, "EI", { enumerable: true, get: function () { return f1_1.I; } });
Object.defineProperty(exports, "EI1", { enumerable: true, get: function () { return f1_1.I; } });
