//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target11.ts] ////

//// [es6modulekindWithES5Target11.ts]
declare function foo(...args: any[]): any;
@foo
export default class C {
    static x() { return C.y; }
    static y = 1
    p = 1;
    method() { }
}

//// [es6modulekindWithES5Target11.js]
@foo
export default class C {
    static x() { return C.y; }
    static y = 1;
    p = 1;
    method() { }
}
