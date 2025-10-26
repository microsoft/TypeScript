//// [tests/cases/conformance/es6/yieldExpressions/generatorOverloads1.ts] ////

//// [generatorOverloads1.ts]
namespace M {
    function* f(s: string): Iterable<any>;
    function* f(s: number): Iterable<any>;
    function* f(s: any): Iterable<any> { }
}

//// [generatorOverloads1.js]
var M;
(function (M) {
    function* f(s) { }
})(M || (M = {}));
