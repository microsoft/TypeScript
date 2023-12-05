//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithObjectMembersOptionality3.ts] ////

//// [subtypingWithObjectMembersOptionality3.ts]
// Base property is optional and derived type has no property of that name

interface Base { foo: string; }
interface Derived extends Base { bar: string; }

interface T {
    Foo?: Base;
}

interface S extends T {
    Foo2: Derived // ok
}

interface T2 {
    1?: Base;
}

interface S2 extends T2 {
    2: Derived; // ok
}

interface T3 {
    '1'?: Base;
}

interface S3 extends T3 {
    '1.0': Derived; // ok
}

// object literal case
var a: { Foo?: Base; }
var b: { Foo2: Derived; }
var r = true ? a : b; // ok

//// [subtypingWithObjectMembersOptionality3.js]
// Base property is optional and derived type has no property of that name
// object literal case
var a;
var b;
var r = true ? a : b; // ok
