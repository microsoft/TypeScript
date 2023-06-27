//// [tests/cases/conformance/es6/yieldExpressions/generatorInAmbientContext6.ts] ////

//// [generatorInAmbientContext6.ts]
module M {
    export function *generator(): any { }
}

//// [generatorInAmbientContext6.js]
var M;
(function (M) {
    function* generator() { }
    M.generator = generator;
})(M || (M = {}));


//// [generatorInAmbientContext6.d.ts]
declare namespace M {
    function generator(): any;
}
