//// [subtypingWithObjectMembersOptionality2.ts]
// Derived member is optional but base member is not, should be an error

interface Base { foo: string; }
interface Derived extends Base { bar: string; }

interface T {
    Foo: Base;
}

interface S extends T {
    Foo?: Derived // error
}

interface T2 {
    1: Base;
}

interface S2 extends T2 {
    1?: Derived; // error
}

interface T3 {
    '1': Base;
}

interface S3 extends T3 {
    '1'?: Derived; // error
}

// object literal case
var a: { Foo: Base; }
var b: { Foo?: Derived; }
var r = true ? a : b; // ok

//// [subtypingWithObjectMembersOptionality2.js]
// Derived member is optional but base member is not, should be an error
// object literal case
var a;
var b;
var r = true ? a : b; // ok
