//// [tests/cases/compiler/thisReferencedInFunctionInsideArrowFunction1.ts] ////

//// [thisReferencedInFunctionInsideArrowFunction1.ts]
var foo = (dummy) => { };
function test()
{
    foo(() =>
        function () { return this; }
    );
}

//// [thisReferencedInFunctionInsideArrowFunction1.js]
"use strict";
var foo = (dummy) => { };
function test() {
    foo(() => function () { return this; });
}
