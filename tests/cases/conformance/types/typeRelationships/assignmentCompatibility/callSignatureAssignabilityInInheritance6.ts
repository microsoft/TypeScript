// checking subtype relations for function types as it relates to contextual signature instantiation
// same as subtypingWithCallSignatures4 but using class type parameters instead of generic signatures
// all are errors

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

interface A { // T
    // M's
    a: <T>(x: T) => T[];
    a2: <T>(x: T) => string[];
    a3: <T>(x: T) => void;
    a4: <T,U>(x: T, y: U) => string;
    a5: <T,U>(x: (arg: T) => U) => T;
    a6: <T extends Base>(x: (arg: T) => Derived) => T;
    a11: <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base;
    a15: <T>(x: { a: T; b: T }) => T[];
    a16: <T extends Base>(x: { a: T; b: T }) => T[];
}

// S's
interface I<T> extends A {
    a: (x: T) => T[]; 
}

interface I2<T> extends A {
    a2: (x: T) => string[]; 
}

interface I3<T> extends A {
    a3: (x: T) => T;
}

interface I4<T> extends A {
    a4: <U>(x: T, y: U) => string; 
}

interface I5<T> extends A {
    a5: <U>(x: (arg: T) => U) => T; 
}

interface I7<T> extends A {
    a11: <U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
}

interface I9<T> extends A {
    a16: (x: { a: T; b: T }) => T[]; 
}