// checking assignment compatibility relations for function types. All valid

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

interface A {
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

var x: A;

var b: <T>(x: T) => T[]; 
x.a = b;
b = x.a;
var b2: <T>(x: T) => string[]; 
x.a2 = b2;
b2 = x.a2;
var b3: <T>(x: T) => T;
x.a3 = b3;
b3 = x.a3;
var b4: <T, U>(x: T, y: U) => string; 
x.a4 = b4;
b4 = x.a4;
var b5: <T, U>(x: (arg: T) => U) => T; 
x.a5 = b5;
b5 = x.a5;
var b11: <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
x.a11 = b11;
b11 = x.a11;
var b16: <T>(x: { a: T; b: T }) => T[]; 
x.a16 = b16;
b16 = x.a16;