//// [tests/cases/conformance/es6/yieldExpressions/generatorInAmbientContext2.ts] ////

//// [generatorInAmbientContext2.ts]
declare module M {
    function *generator(): any;
}

//// [generatorInAmbientContext2.js]
