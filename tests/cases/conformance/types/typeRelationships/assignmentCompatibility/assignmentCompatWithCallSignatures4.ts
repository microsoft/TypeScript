// These are mostly permitted with the current loose rules. All ok unless otherwise noted.

module Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    module WithNonGenericSignaturesInBaseType {
        // target type with non-generic call signatures
        var a2: (x: number) => string[];
        var a7: (x: (arg: Base) => Derived) => (r: Base) => Derived2;
        var a8: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
        var a10: (...x: Base[]) => Base;
        var a11: (x: { foo: string }, y: { foo: string; bar: string }) => Base;
        var a12: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
        var a14: {
                (x: number): number[];
                (x: string): string[];
            };
        var a15: (x: { a: string; b: number }) => number;
        var a16: {
                (x: {
                    (a: number): number;
                    (a?: number): number;
                }): number[];
                (x: {
                    (a: boolean): boolean;
                    (a?: boolean): boolean;
                }): boolean[];
            };
        var a17: {
                (x: {
                    <T extends Derived>(a: T): T;
                    <T extends Base>(a: T): T;
                }): any[];
                (x: {
                    <T extends Derived2>(a: T): T;
                    <T extends Base>(a: T): T;
                }): any[];
            };

        var b2: <T, U>(x: T) => U[]; 
        a2 = b2;
        b2 = a2;

        var b7: <T extends Base, U extends Derived, V extends Derived2>(x: (arg: T) => U) => (r: T) => V;
        a7 = b7;
        b7 = a7;

        var b8: <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: number; }) => U) => (r: T) => U; 
        a8 = b8; // error, { foo: number } and Base are incompatible
        b8 = a8; // error, { foo: number } and Base are incompatible

        
        var b10: <T extends Derived>(...x: T[]) => T; 
        a10 = b10;
        b10 = a10;

        var b11: <T extends Derived>(x: T, y: T) => T; 
        a11 = b11;
        b11 = a11;

        var b12: <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => T; 
        a12 = b12;
        b12 = a12;

        var b15: <T>(x: { a: T; b: T }) => T; 
        a15 = b15;
        b15 = a15;

        var b15a: <T extends Base>(x: { a: T; b: T }) => number; 
        a15 = b15a;
        b15a = a15;

        var b16: <T>(x: (a: T) => T) => T[];
        a16 = b16;
        b16 = a16;

        var b17: <T>(x: (a: T) => T) => any[];
        a17 = b17;
        b17 = a17;
    }

    module WithGenericSignaturesInBaseType {
        // target type has generic call signature
        var a2: <T>(x: T) => T[];
        var b2: <T>(x: T) => string[];
        a2 = b2;
        b2 = a2;

        // target type has generic call signature
        var a3: <T>(x: T) => string[];
        var b3: <T>(x: T) => T[]; 
        a3 = b3;
        b3 = a3;
    }
}