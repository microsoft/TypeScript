// checking assignment compat for function types. No errors in this file

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

declare var a: <T>(x: T) => T[];
declare var a2: <T>(x: T) => string[];
declare var a3: <T>(x: T) => void;
declare var a4: <T,U>(x: T, y: U) => string;
declare var a5: <T,U>(x: (arg: T) => U) => T;
declare var a6: <T extends Base>(x: (arg: T) => Derived) => T;
declare var a11: <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base;
declare var a15: <T>(x: { a: T; b: T }) => T[];
declare var a16: <T extends Base>(x: { a: T; b: T }) => T[];
declare var a17: {
    <T extends Derived>(x: (a: T) => T): T[];
    <T extends Base>(x: (a: T) => T): T[];        
};
declare var a18: {
    (x: {
        <T extends Derived>(a: T): T;
        <T extends Base>(a: T): T;
    }): any[];
    (x: {
        <T extends Derived2>(a: T): T;
        <T extends Base>(a: T): T;
    }): any[];
};

declare var b: <T>(x: T) => T[]; 
a = b; // ok
b = a; // ok
declare var b2: <T>(x: T) => string[]; 
a2 = b2; // ok
b2 = a2; // ok
declare var b3: <T>(x: T) => T; 
a3 = b3; // ok
b3 = a3; // ok
declare var b4: <T, U>(x: T, y: U) => string; 
a4 = b4; // ok
b4 = a4; // ok
declare var b5: <T, U>(x: (arg: T) => U) => T; 
a5 = b5; // ok
b5 = a5; // ok
declare var b6: <T extends Base, U extends Derived>(x: (arg: T) => U) => T; 
a6 = b6; // ok
b6 = a6; // ok
declare var b11: <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
a11 = b11; // ok
b11 = a11; // ok
declare var b15: <U, V>(x: { a: U; b: V; }) => U[]; 
a15 = b15; // ok, T = U, T = V
b15 = a15; // ok
declare var b16: <T>(x: { a: T; b: T }) => T[]; 
a15 = b16; // ok
b15 = a16; // ok
declare var b17: <T>(x: (a: T) => T) => T[]; 
a17 = b17; // ok
b17 = a17; // ok
declare var b18: (x: <T>(a: T) => T) => any[]; 
a18 = b18; // ok
b18 = a18; // ok
