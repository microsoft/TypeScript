//// [thisReferencedInFunctionInsideArrowFunction1.ts]
var foo = (dummy) => { };
function test()
{
    foo(() =>
        function () { return this; }
    );
}

//// [thisReferencedInFunctionInsideArrowFunction1.js]
var foo = function (dummy) { };
function test() {
    foo(function () {
        return function () { return this; };
    });
}
