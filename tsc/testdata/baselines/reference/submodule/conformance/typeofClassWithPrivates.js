//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeofClassWithPrivates.ts] ////

//// [typeofClassWithPrivates.ts]
class C<T> {
    private a: number;
    private static b: number;
    x: T;
    static y: T;
}

var c: C<string>;
var r: typeof C;
var r2: typeof c;

//// [typeofClassWithPrivates.js]
class C {
    a;
    static b;
    x;
    static y;
}
var c;
var r;
var r2;
