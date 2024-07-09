// Base has required property, derived adds an optional property, no errors

interface Base { foo: string; }
interface Derived extends Base { bar: string; }

interface T {
    Foo: Base;
}

interface S extends T {
    Foo2?: Derived // ok
}

interface T2 {
    1: Base; 
}

interface S2 extends T2 {
    2?: Derived; // ok
}

interface T3 {
    '1': Base;
}

interface S3 extends T3 {
    '1.0'?: Derived; // ok
}

// object literal case
var a: { Foo: Base; }
var b: { Foo2?: Derived; }
var r = true ? a : b; // ok