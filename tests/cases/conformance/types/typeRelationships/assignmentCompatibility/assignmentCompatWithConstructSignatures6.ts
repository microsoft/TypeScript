// checking assignment compatibility relations for function types. All valid.

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

interface A {
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

var x: A;

var b: new <T>(x: T) => T[]; 
x.a = b;
b = x.a;
var b2: new <T>(x: T) => string[]; 
x.a2 = b2;
b2 = x.a2;
var b3: new <T>(x: T) => T;
x.a3 = b3;
b3 = x.a3;
var b4: new <T, U>(x: T, y: U) => string; 
x.a4 = b4;
b4 = x.a4;
var b5: new <T, U>(x: (arg: T) => U) => T; 
x.a5 = b5;
b5 = x.a5;
var b11: new <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
x.a11 = b11;
b11 = x.a11;
var b16: new <T>(x: { a: T; b: T }) => T[]; 
x.a16 = b16;
b16 = x.a16;