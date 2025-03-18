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
var foo = (dummy) => { };
function test() {
    foo(() => function () { return this; });
}
