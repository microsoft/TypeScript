//// [tests/cases/conformance/es6/yieldExpressions/generatorOverloads2.ts] ////

//// [generatorOverloads2.ts]
declare namespace M {
    function* f(s: string): Iterable<any>;
    function* f(s: number): Iterable<any>;
    function* f(s: any): Iterable<any>;
}

//// [generatorOverloads2.js]
