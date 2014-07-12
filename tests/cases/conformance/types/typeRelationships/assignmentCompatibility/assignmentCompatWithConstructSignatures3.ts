// checking assignment compatibility relations for function types. All of these are valid.

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

var a: new (x: number) => number[];
var a2: new (x: number) => string[];
var a3: new (x: number) => void;
var a4: new (x: string, y: number) => string;
var a5: new (x: (arg: string) => number) => string;
var a6: new (x: (arg: Base) => Derived) => Base;
var a7: new (x: (arg: Base) => Derived) => (r: Base) => Derived;
var a8: new (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
var a9: new (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
var a10: new (...x: Derived[]) => Derived;
var a11: new (x: { foo: string }, y: { foo: string; bar: string }) => Base;
var a12: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
var a13: new (x: Array<Base>, y: Array<Derived>) => Array<Derived>;
var a14: new (x: { a: string; b: number }) => Object;
var a15: {
    new (x: number): number[];
    new (x: string): string[];
}
var a16: {
    new <T extends Derived>(x: T): number[];
    new <U extends Base>(x: U): number[];
}
var a17: {
    new (x: new (a: number) => number): number[];
    new (x: new (a: string) => string): string[];
};
var a18: {
    new (x: {
        new (a: number): number;
        new (a: string): string;
    }): any[];
    new (x: {
        new (a: boolean): boolean;
        new (a: Date): Date;
    }): any[];
}

var b: new <T>(x: T) => T[]; 
a = b; // ok
b = a; // ok
var b2: new <T>(x: T) => string[]; 
a2 = b2; // ok 
b2 = a2; // ok
var b3: new <T>(x: T) => T; 
a3 = b3; // ok
b3 = a3; // ok
var b4: new <T, U>(x: T, y: U) => T; 
a4 = b4; // ok
b4 = a4; // ok
var b5: new <T, U>(x: (arg: T) => U) => T; 
a5 = b5; // ok
b5 = a5; // ok
var b6: new <T extends Base, U extends Derived>(x: (arg: T) => U) => T; 
a6 = b6; // ok
b6 = a6; // ok
var b7: new <T extends Base, U extends Derived>(x: (arg: T) => U) => (r: T) => U; 
a7 = b7; // ok
b7 = a7; // ok
var b8: new <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: T) => U) => (r: T) => U;
a8 = b8; // ok
b8 = a8; // ok
var b9: new <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: string; bing: number }) => U) => (r: T) => U; 
a9 = b9; // ok
b9 = a9; // ok
var b10: new <T extends Derived>(...x: T[]) => T; 
a10 = b10; // ok
b10 = a10; // ok
var b11: new <T extends Base>(x: T, y: T) => T; 
a11 = b11; // ok
b11 = a11; // ok
var b12: new <T extends Array<Base>>(x: Array<Base>, y: T) => Array<Derived>; 
a12 = b12; // ok
b12 = a12; // ok
var b13: new <T extends Array<Derived>>(x: Array<Base>, y: T) => T; 
a13 = b13; // ok
b13 = a13; // ok
var b14: new <T>(x: { a: T; b: T }) => T; 
a14 = b14; // ok
b14 = a14; // ok
var b15: new <T>(x: T) => T[]; 
a15 = b15; // ok
b15 = a15; // ok
var b16: new <T extends Base>(x: T) => number[];
a16 = b16; // ok
b16 = a16; // ok
var b17: new <T>(x: new (a: T) => T) => T[]; // ok
a17 = b17; // ok
b17 = a17; // ok
var b18: new <T>(x: new (a: T) => T) => T[]; 
a18 = b18; // ok
b18 = a18; // ok
