//// [tests/cases/compiler/commentOnSimpleArrowFunctionBody1.ts] ////

//// [commentOnSimpleArrowFunctionBody1.ts]
function Foo(x: any)
{
}
 
Foo(() =>
    // do something
    127);


//// [commentOnSimpleArrowFunctionBody1.js]
"use strict";
function Foo(x) {
}
Foo(() => 
// do something
127);
