//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithConstructSignatures3.ts] ////

//// [assignmentCompatWithConstructSignatures3.ts]
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


//// [assignmentCompatWithConstructSignatures3.js]
// checking assignment compatibility relations for function types. All of these are valid.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Derived));
var OtherDerived = /** @class */ (function (_super) {
    __extends(OtherDerived, _super);
    function OtherDerived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OtherDerived;
}(Base));
var a;
var a2;
var a3;
var a4;
var a5;
var a6;
var a7;
var a8;
var a9;
var a10;
var a11;
var a12;
var a13;
var a14;
var a15;
var a16;
var a17;
var a18;
var b;
a = b; // ok
b = a; // ok
var b2;
a2 = b2; // ok 
b2 = a2; // ok
var b3;
a3 = b3; // ok
b3 = a3; // ok
var b4;
a4 = b4; // ok
b4 = a4; // ok
var b5;
a5 = b5; // ok
b5 = a5; // ok
var b6;
a6 = b6; // ok
b6 = a6; // ok
var b7;
a7 = b7; // ok
b7 = a7; // ok
var b8;
a8 = b8; // ok
b8 = a8; // ok
var b9;
a9 = b9; // ok
b9 = a9; // ok
var b10;
a10 = b10; // ok
b10 = a10; // ok
var b11;
a11 = b11; // ok
b11 = a11; // ok
var b12;
a12 = b12; // ok
b12 = a12; // ok
var b13;
a13 = b13; // ok
b13 = a13; // ok
var b14;
a14 = b14; // ok
b14 = a14; // ok
var b15;
a15 = b15; // ok
b15 = a15; // ok
var b16;
a16 = b16; // ok
b16 = a16; // ok
var b17; // ok
a17 = b17; // ok
b17 = a17; // ok
var b18;
a18 = b18; // ok
b18 = a18; // ok
