//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target11.ts] ////

//// [esnextmodulekindWithES5Target11.ts]
declare function foo(...args: any[]): any;
@foo
export default class C {
    static x() { return C.y; }
    static y = 1
    p = 1;
    method() { }
}

//// [esnextmodulekindWithES5Target11.js]
@foo
export default class C {
    static x() { return C.y; }
    static y = 1;
    p = 1;
    method() { }
}
