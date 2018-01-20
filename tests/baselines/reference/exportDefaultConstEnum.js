//// [tests/cases/compiler/exportDefaultConstEnum.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export
default
const
enum
A
{ FOO }

//// [b.ts]
import A from './a';

const x = A.FOO;

//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var x = 0 /* FOO */;
