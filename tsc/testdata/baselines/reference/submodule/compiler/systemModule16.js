//// [tests/cases/compiler/systemModule16.ts] ////

//// [systemModule16.ts]
import * as x from "foo";
import * as y from "bar";
export * from "foo";
export * from "bar"
export {x}
export {y}
import {a1, b1, c1 as d1} from "foo";
export {a2, b2, c2 as d2} from "bar";

x,y,a1,b1,d1;


//// [systemModule16.js]
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
exports.d2 = exports.b2 = exports.a2 = exports.y = exports.x = void 0;
const x = require("foo");
exports.x = x;
const y = require("bar");
exports.y = y;
__exportStar(require("foo"), exports);
__exportStar(require("bar"), exports);
const foo_1 = require("foo");
const bar_1 = require("bar");
Object.defineProperty(exports, "a2", { enumerable: true, get: function () { return bar_1.a2; } });
Object.defineProperty(exports, "b2", { enumerable: true, get: function () { return bar_1.b2; } });
Object.defineProperty(exports, "d2", { enumerable: true, get: function () { return bar_1.c2; } });
x, y, foo_1.a1, foo_1.b1, foo_1.c1;
