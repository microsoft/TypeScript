//// [tests/cases/conformance/importAttributes/importAttributes1.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
import './0' with { type: "json" }
import { a, b } from './0' with { "type": "json" }
import * as foo from './0' with { type: "json" }
a;
b;
foo.a;
foo.b;
//// [2.ts]
import { a, b } from './0' with {}
import { a as c, b as d } from './0' with { a: "a", b: "b", c: "c" }
a;
b;
c;
d;
//// [3.ts]
const a = import('./0')
const b = import('./0', { with: { type: "json" } })
const c = import('./0', { with: { type: "json", ttype: "typo" } })
const d = import('./0', { with: {} })
const dd = import('./0', {})
declare function foo(): any;
const e = import('./0', foo())
const f = import()
const g = import('./0', {}, {})
const h = import('./0', { with: { type: "json" }},)


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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("./0");
const _0_1 = require("./0");
const foo = __importStar(require("./0"));
_0_1.a;
_0_1.b;
foo.a;
foo.b;
//// [2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _0_1 = require("./0");
const _0_2 = require("./0");
_0_1.a;
_0_1.b;
_0_2.a;
_0_2.b;
//// [3.js]
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
const a = Promise.resolve().then(() => __importStar(require('./0')));
const b = Promise.resolve().then(() => __importStar(require('./0')));
const c = Promise.resolve().then(() => __importStar(require('./0')));
const d = Promise.resolve().then(() => __importStar(require('./0')));
const dd = Promise.resolve().then(() => __importStar(require('./0')));
const e = Promise.resolve().then(() => __importStar(require('./0')));
const f = Promise.resolve().then(() => __importStar(require()));
const g = Promise.resolve().then(() => __importStar(require('./0')));
const h = Promise.resolve().then(() => __importStar(require('./0')));


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
import './0';
//// [2.d.ts]
export {};
//// [3.d.ts]
declare const a: Promise<typeof import("./0")>;
declare const b: Promise<typeof import("./0")>;
declare const c: Promise<typeof import("./0")>;
declare const d: Promise<typeof import("./0")>;
declare const dd: Promise<typeof import("./0")>;
declare function foo(): any;
declare const e: Promise<typeof import("./0")>;
declare const f: Promise<any>;
declare const g: Promise<typeof import("./0")>;
declare const h: Promise<typeof import("./0")>;
