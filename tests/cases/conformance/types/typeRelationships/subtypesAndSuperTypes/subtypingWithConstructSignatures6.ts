// checking subtype relations for function types as it relates to contextual signature instantiation
// same as subtypingWithConstructSignatures4 but using class type parameters instead of generic signatures
// all are errors

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

interface A { // T
    // M's
    a: new <T>(x: T) => T[];
    a2: new <T>(x: T) => string[];
    a3: new <T>(x: T) => void;
    a4: new <T, U>(x: T, y: U) => string;
    a5: new <T, U>(x: (arg: T) => U) => T;
    a6: new <T extends Base>(x: (arg: T) => Derived) => T;
    a11: new <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base;
    a15: new <T>(x: { a: T; b: T }) => T[];
    a16: new <T extends Base>(x: { a: T; b: T }) => T[];
}

// S's
interface I<T> extends A {
    a: new (x: T) => T[]; 
}

interface I2<T> extends A {
    a2: new (x: T) => string[]; 
}

interface I3<T> extends A {
    a3: new (x: T) => T;
}

interface I4<T> extends A {
    a4: new <U>(x: T, y: U) => string; 
}

interface I5<T> extends A {
    a5: new <U>(x: (arg: T) => U) => T; 
}

interface I7<T> extends A {
    a11: new <U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
}

interface I9<T> extends A {
    a16: new (x: { a: T; b: T }) => T[]; 
}