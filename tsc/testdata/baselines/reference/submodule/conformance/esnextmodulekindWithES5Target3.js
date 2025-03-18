//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target3.ts] ////

//// [esnextmodulekindWithES5Target3.ts]
declare function foo(...args: any[]): any;
@foo
export default class D {
    static s = 0;
    p = 1;
    method() { }
}

//// [esnextmodulekindWithES5Target3.js]
@foo
export default class D {
    static s = 0;
    p = 1;
    method() { }
}
