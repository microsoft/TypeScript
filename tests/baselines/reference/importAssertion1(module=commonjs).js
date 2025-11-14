//// [tests/cases/conformance/importAssertion/importAssertion1.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
import './0' assert { type: "json" }
import { a, b } from './0' assert { "type": "json" }
import * as foo from './0' assert { type: "json" }
a;
b;
foo.a;
foo.b;

//// [2.ts]
import { a, b } from './0' assert {}
import { a as c, b as d } from './0' assert { a: "a", b: "b", c: "c" }
a;
b;
c;
d;

//// [3.ts]
const a = import('./0')
const b = import('./0', { assert: { type: "json" } })
const c = import('./0', { assert: { type: "json", ttype: "typo" } })
const d = import('./0', { assert: {} })
const dd = import('./0', {})
declare function foo(): any;
const e = import('./0', foo())
const f = import()
const g = import('./0', {}, {})
const h = import('./0', { assert: { type: "json" }},)



//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./0");
const _0_1 = require("./0");
const foo = require("./0");
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
const a = Promise.resolve().then(() => require('./0'));
const b = Promise.resolve().then(() => require('./0'));
const c = Promise.resolve().then(() => require('./0'));
const d = Promise.resolve().then(() => require('./0'));
const dd = Promise.resolve().then(() => require('./0'));
const e = Promise.resolve().then(() => require('./0'));
const f = Promise.resolve().then(() => require());
const g = Promise.resolve().then(() => require('./0'));
const h = Promise.resolve().then(() => require('./0'));


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
