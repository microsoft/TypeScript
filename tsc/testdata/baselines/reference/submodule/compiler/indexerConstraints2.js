//// [tests/cases/compiler/indexerConstraints2.ts] ////

//// [indexerConstraints2.ts]
class A { a: number; }
class B extends A { b: number; }

// Inheritance
class F {
    [s: string]: B
}
class G extends F {
    [n: number]: A
}

// Other way
class H {
    [n: number]: A
}
class I extends H {
    [s: string]: B
}

// With hidden indexer
class J {
    [n: number]: {}
}

class K extends J {
    [n: number]: A;
    [s: string]: B;
}


type AliasedNumber = number;

interface L {
    [n: AliasedNumber]: A;
}

type AliasedString = string;

interface M {
    [s: AliasedString]: A;
}

type AliasedBoolean = boolean;

interface N {
    [b: AliasedBoolean]: A;
}

type IndexableUnion = "foo" | "bar";

interface O {
    [u: IndexableUnion]: A;
}

type NonIndexableUnion = boolean | {};

interface P {
    [u: NonIndexableUnion]: A;
}

type NonIndexableUnion2 = string | number;

interface Q {
    [u: NonIndexableUnion2]: A;
}

type NonIndexableUnion3 = "foo" | 42;

interface R {
    [u: NonIndexableUnion3]: A;
}

interface S {
    [u: "foo" | "bar"]: A;
}

type Key = string;
interface T {
    [key: Key]
}


//// [indexerConstraints2.js]
class A {
    a;
}
class B extends A {
    b;
}
// Inheritance
class F {
}
class G extends F {
}
// Other way
class H {
}
class I extends H {
}
// With hidden indexer
class J {
}
class K extends J {
}
