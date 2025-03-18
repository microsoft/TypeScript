//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck55.ts] ////

//// [generatorTypeCheck55.ts]
function* g() {
    var x = class C extends (yield) {};
}

//// [generatorTypeCheck55.js]
function* g() {
    var x = class C extends (yield) {
    };
}
