//// [tests/cases/compiler/classOverloadForFunction.ts] ////

//// [classOverloadForFunction.ts]
class foo { };
function foo() {}


//// [classOverloadForFunction.js]
"use strict";
class foo {
}
;
function foo() { }
