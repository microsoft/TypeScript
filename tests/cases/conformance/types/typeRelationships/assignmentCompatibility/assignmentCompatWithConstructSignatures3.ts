// checking assignment compatibility relations for function types. All of these are valid.

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

declare var a: new (x: number) => number[];
declare var a2: new (x: number) => string[];
declare var a3: new (x: number) => void;
declare var a4: new (x: string, y: number) => string;
declare var a5: new (x: (arg: string) => number) => string;
declare var a6: new (x: (arg: Base) => Derived) => Base;
declare var a7: new (x: (arg: Base) => Derived) => (r: Base) => Derived;
declare var a8: new (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
declare var a9: new (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
declare var a10: new (...x: Derived[]) => Derived;
declare var a11: new (x: { foo: string }, y: { foo: string; bar: string }) => Base;
declare var a12: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
declare var a13: new (x: Array<Base>, y: Array<Derived>) => Array<Derived>;
declare var a14: new (x: { a: string; b: number }) => Object;
declare var a15: {
    new (x: number): number[];
    new (x: string): string[];
}
declare var a16: {
    new <T extends Derived>(x: T): number[];
    new <U extends Base>(x: U): number[];
}
declare var a17: {
    new (x: new (a: number) => number): number[];
    new (x: new (a: string) => string): string[];
};
declare var a18: {
    new (x: {
        new (a: number): number;
        new (a: string): string;
    }): any[];
    new (x: {
        new (a: boolean): boolean;
        new (a: Date): Date;
    }): any[];
}

declare var b: new <T>(x: T) => T[]; 
a = b; // ok
b = a; // ok
declare var b2: new <T>(x: T) => string[]; 
a2 = b2; // ok 
b2 = a2; // ok
declare var b3: new <T>(x: T) => T; 
a3 = b3; // ok
b3 = a3; // ok
declare var b4: new <T, U>(x: T, y: U) => T; 
a4 = b4; // ok
b4 = a4; // ok
declare var b5: new <T, U>(x: (arg: T) => U) => T; 
a5 = b5; // ok
b5 = a5; // ok
declare var b6: new <T extends Base, U extends Derived>(x: (arg: T) => U) => T; 
a6 = b6; // ok
b6 = a6; // ok
declare var b7: new <T extends Base, U extends Derived>(x: (arg: T) => U) => (r: T) => U; 
a7 = b7; // ok
b7 = a7; // ok
declare var b8: new <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: T) => U) => (r: T) => U;
a8 = b8; // ok
b8 = a8; // ok
declare var b9: new <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: string; bing: number }) => U) => (r: T) => U; 
a9 = b9; // ok
b9 = a9; // ok
declare var b10: new <T extends Derived>(...x: T[]) => T; 
a10 = b10; // ok
b10 = a10; // ok
declare var b11: new <T extends Base>(x: T, y: T) => T; 
a11 = b11; // ok
b11 = a11; // ok
declare var b12: new <T extends Array<Base>>(x: Array<Base>, y: T) => Array<Derived>; 
a12 = b12; // ok
b12 = a12; // ok
declare var b13: new <T extends Array<Derived>>(x: Array<Base>, y: T) => T; 
a13 = b13; // ok
b13 = a13; // ok
declare var b14: new <T>(x: { a: T; b: T }) => T; 
a14 = b14; // ok
b14 = a14; // ok
declare var b15: new <T>(x: T) => T[]; 
a15 = b15; // ok
b15 = a15; // ok
declare var b16: new <T extends Base>(x: T) => number[];
a16 = b16; // ok
b16 = a16; // ok
declare var b17: new <T>(x: new (a: T) => T) => T[]; // ok
a17 = b17; // ok
b17 = a17; // ok
declare var b18: new <T>(x: new (a: T) => T) => T[]; 
a18 = b18; // ok
b18 = a18; // ok
