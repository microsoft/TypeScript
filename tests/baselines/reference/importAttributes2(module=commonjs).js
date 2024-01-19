//// [tests/cases/conformance/importAttributes/importAttributes2.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export {} from './0' with { type: "json" }
export { a, b } from './0' with { type: "json" }
export * from './0' with { type: "json" }
export * as ns from './0' with { type: "json" }

//// [2.ts]
export { a, b } from './0' with {}
export { a as c, b as d } from './0' with { a: "a", b: "b", c: "c" }


//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;
//// [1.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ns = exports.b = exports.a = void 0;
var _0_1 = require("./0");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return _0_1.a; } });
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return _0_1.b; } });
__exportStar(require("./0"), exports);
exports.ns = require("./0");
//// [2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = exports.c = exports.b = exports.a = void 0;
var _0_1 = require("./0");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return _0_1.a; } });
Object.defineProperty(exports, "b", { enumerable: true, get: function () { return _0_1.b; } });
var _0_2 = require("./0");
Object.defineProperty(exports, "c", { enumerable: true, get: function () { return _0_2.a; } });
Object.defineProperty(exports, "d", { enumerable: true, get: function () { return _0_2.b; } });


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export {} from './0';
export { a, b } from './0';
export * from './0';
export * as ns from './0';
//// [2.d.ts]
export { a, b } from './0';
export { a as c, b as d } from './0';
