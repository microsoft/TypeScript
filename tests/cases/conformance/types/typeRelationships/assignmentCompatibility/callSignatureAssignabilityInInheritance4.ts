// checking subtype relations for function types as it relates to contextual signature instantiation

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
    a17: {
        <T extends Derived>(x: (a: T) => T): T[];
        <T extends Base>(x: (a: T) => T): T[];        
    };
    a18: {
        (x: {
            <T extends Derived>(a: T): T;
            <T extends Base>(a: T): T;
        }): any[];
        (x: {
            <T extends Derived2>(a: T): T;
            <T extends Base>(a: T): T;
        }): any[];
    };
}

// S's
interface I extends A {
    // N's
    a: <T>(x: T) => T[]; // ok, instantiation of N is a subtype of M, T is number
    a2: <T>(x: T) => string[]; // ok
    a3: <T>(x: T) => T; // ok since Base returns void
    a4: <T, U>(x: T, y: U) => string; // ok, instantiation of N is a subtype of M, T is string, U is number
    a5: <T, U>(x: (arg: T) => U) => T; // ok, U is in a parameter position so inferences can be made
    a6: <T extends Base, U extends Derived>(x: (arg: T) => U) => T; // ok, same as a5 but with object type hierarchy
    a11: <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; // ok
    a15: <U, V>(x: { a: U; b: V; }) => U[]; // ok, T = U, T = V
    a16: <T>(x: { a: T; b: T }) => T[]; // ok, more general parameter type
    a17: <T>(x: (a: T) => T) => T[]; // ok
    a18: (x: <T>(a: T) => T) => any[]; // ok
}