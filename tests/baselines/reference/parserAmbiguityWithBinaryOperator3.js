//// [tests/cases/conformance/parser/ecmascript5/Generics/parserAmbiguityWithBinaryOperator3.ts] ////

//// [parserAmbiguityWithBinaryOperator3.ts]
function f() {
    var a, b, c;
    if (a < b && b < (c + 1)) { }
}


//// [parserAmbiguityWithBinaryOperator3.js]
function f() {
    var a, b, c;
    if (a < b && b < (c + 1)) { }
}
