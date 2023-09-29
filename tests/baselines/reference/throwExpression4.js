//// [tests/cases/conformance/throwExpression/throwExpression4.ts] ////

//// [throwExpression4.ts]
() => throw new Error("Unexpected value");


//// [throwExpression4.js]
(function () { return (function () {
    throw new Error("Unexpected value");
})(); });
