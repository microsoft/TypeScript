//// [tests/cases/compiler/systemModule11.ts] ////

//// [file1.ts]
export var x;
export function foo() {}
export * from 'bar';

//// [file2.ts]
var x;
var y;
export {x};
export {y as y1}

export * from 'bar';

//// [file3.ts]
export {x, y as z} from 'a';
export default function foo() {}
export * from 'bar';

//// [file4.ts]
export var x;
export function foo() {}
export default function (){}

var z, z1;
export {z, z1 as z2};

export {s, s1 as s2} from 'a'

//// [file5.ts]
function foo() {}
export * from 'a';

//// [file1.js]
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
exports.x = void 0;
exports.foo = foo;
function foo() { }
__exportStar(require("bar"), exports);
//// [file2.js]
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
exports.y1 = exports.x = void 0;
var x;
var y;
__exportStar(require("bar"), exports);
//// [file3.js]
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
exports.z = exports.x = void 0;
exports.default = foo;
const a_1 = require("a");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return a_1.x; } });
Object.defineProperty(exports, "z", { enumerable: true, get: function () { return a_1.y; } });
function foo() { }
__exportStar(require("bar"), exports);
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s2 = exports.s = exports.z2 = exports.z = exports.x = void 0;
exports.foo = foo;
exports.default = default_1;
function foo() { }
function default_1() { }
var z, z1;
const a_1 = require("a");
Object.defineProperty(exports, "s", { enumerable: true, get: function () { return a_1.s; } });
Object.defineProperty(exports, "s2", { enumerable: true, get: function () { return a_1.s1; } });
//// [file5.js]
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
function foo() { }
__exportStar(require("a"), exports);
