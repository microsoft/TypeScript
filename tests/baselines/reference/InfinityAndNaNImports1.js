//// [tests/cases/compiler/InfinityAndNaNImports1.ts] ////

//// [foo.ts]
export const Infinity = "NaN";
export const NaN = "undefined";
export const undefined = "Infinity";

//// [bar.ts]
import { Infinity, NaN, undefined } from "./foo";
import * as foo from "./foo";

Infinity;
NaN;
-Infinity;
-NaN;
foo.Infinity;
foo.NaN;
foo[Infinity];
foo[NaN];

undefined;
foo.undefined;
foo[undefined];


//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undefined = exports.NaN = exports.Infinity = void 0;
exports.Infinity = "NaN";
exports.NaN = "undefined";
exports.undefined = "Infinity";
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("./foo");
var foo = require("./foo");
foo_1.Infinity;
foo_1.NaN;
-foo_1.Infinity;
-foo_1.NaN;
foo.Infinity;
foo.NaN;
foo[foo_1.Infinity];
foo[foo_1.NaN];
foo_1.undefined;
foo.undefined;
foo[foo_1.undefined];
