//// [tests/cases/compiler/commonjsSafeImport.ts] ////

//// [10_lib.ts]

export function Foo() {}

//// [main.ts]
import { Foo } from './10_lib';

Foo();


//// [10_lib.js]
"use strict";
function Foo() { }
exports.Foo = Foo;
//// [main.js]
"use strict";
var _10_lib_1 = require('./10_lib');
_10_lib_1.Foo();


//// [10_lib.d.ts]
export declare function Foo(): void;
//// [main.d.ts]
