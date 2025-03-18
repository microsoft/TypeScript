//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target3.ts] ////

//// [es6modulekindWithES5Target3.ts]
declare function foo(...args: any[]): any;
@foo
export default class D {
    static s = 0;
    p = 1;
    method() { }
}

//// [es6modulekindWithES5Target3.js]
@foo
export default class D {
    static s = 0;
    p = 1;
    method() { }
}
