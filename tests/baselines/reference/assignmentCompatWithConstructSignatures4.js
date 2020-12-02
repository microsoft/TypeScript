//// [assignmentCompatWithConstructSignatures4.ts]
// checking assignment compatibility relations for function types.

module Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    module WithNonGenericSignaturesInBaseType {
        // target type with non-generic call signatures
        var a2: new (x: number) => string[];
        var a7: new (x: (arg: Base) => Derived) => (r: Base) => Derived2;
        var a8: new (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
        var a10: new (...x: Base[]) => Base;
        var a11: new (x: { foo: string }, y: { foo: string; bar: string }) => Base;
        var a12: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
        var a14: {
                new (x: number): number[];
                new (x: string): string[];
            };
        var a15: new (x: { a: string; b: number }) => number;
        var a16: {
                new (x: {
                    new (a: number): number;
                    new (a?: number): number;
                }): number[];
                new (x: {
                    new (a: boolean): boolean;
                    new (a?: boolean): boolean;
                }): boolean[];
            };
        var a17: {
                new (x: {
                    new <T extends Derived>(a: T): T;
                    new <T extends Base>(a: T): T;
                }): any[];
                new (x: {
                    new <T extends Derived2>(a: T): T;
                    new <T extends Base>(a: T): T;
                }): any[];
            };

        var b2: new <T, U>(x: T) => U[]; 
        a2 = b2; // ok
        b2 = a2; // ok

        var b7: new <T extends Base, U extends Derived, V extends Derived2>(x: (arg: T) => U) => (r: T) => V;
        a7 = b7; // ok
        b7 = a7; // ok

        var b8: new <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: number; }) => U) => (r: T) => U; 
        a8 = b8; // error, type mismatch
        b8 = a8; // error

        
        var b10: new <T extends Derived>(...x: T[]) => T; 
        a10 = b10; // ok
        b10 = a10; // ok

        var b11: new <T extends Derived>(x: T, y: T) => T; 
        a11 = b11; // ok
        b11 = a11; // ok

        var b12: new <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => T; 
        a12 = b12; // ok
        b12 = a12; // ok

        var b15: new <T>(x: { a: T; b: T }) => T; 
        a15 = b15; // ok
        b15 = a15; // ok

        var b15a: new <T extends Base>(x: { a: T; b: T }) => number; 
        a15 = b15a; // ok
        b15a = a15; // ok

        var b16: new <T>(x: (a: T) => T) => T[];
        a16 = b16; // error
        b16 = a16; // error

        var b17: new <T>(x: (a: T) => T) => any[];
        a17 = b17; // error
        b17 = a17; // error
    }

    module WithGenericSignaturesInBaseType {
        // target type has generic call signature
        var a2: new <T>(x: T) => T[];
        var b2: new <T>(x: T) => string[];
        a2 = b2; // ok
        b2 = a2; // ok

        // target type has generic call signature
        var a3: new <T>(x: T) => string[];
        var b3: new <T>(x: T) => T[]; 
        a3 = b3; // ok
        b3 = a3; // ok
    }
}

//// [assignmentCompatWithConstructSignatures4.js]
// checking assignment compatibility relations for function types.
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
var Errors;
(function (Errors) {
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
    var WithNonGenericSignaturesInBaseType;
    (function (WithNonGenericSignaturesInBaseType) {
        // target type with non-generic call signatures
        var a2;
        var a7;
        var a8;
        var a10;
        var a11;
        var a12;
        var a14;
        var a15;
        var a16;
        var a17;
        var b2;
        a2 = b2; // ok
        b2 = a2; // ok
        var b7;
        a7 = b7; // ok
        b7 = a7; // ok
        var b8;
        a8 = b8; // error, type mismatch
        b8 = a8; // error
        var b10;
        a10 = b10; // ok
        b10 = a10; // ok
        var b11;
        a11 = b11; // ok
        b11 = a11; // ok
        var b12;
        a12 = b12; // ok
        b12 = a12; // ok
        var b15;
        a15 = b15; // ok
        b15 = a15; // ok
        var b15a;
        a15 = b15a; // ok
        b15a = a15; // ok
        var b16;
        a16 = b16; // error
        b16 = a16; // error
        var b17;
        a17 = b17; // error
        b17 = a17; // error
    })(WithNonGenericSignaturesInBaseType || (WithNonGenericSignaturesInBaseType = {}));
    var WithGenericSignaturesInBaseType;
    (function (WithGenericSignaturesInBaseType) {
        // target type has generic call signature
        var a2;
        var b2;
        a2 = b2; // ok
        b2 = a2; // ok
        // target type has generic call signature
        var a3;
        var b3;
        a3 = b3; // ok
        b3 = a3; // ok
    })(WithGenericSignaturesInBaseType || (WithGenericSignaturesInBaseType = {}));
})(Errors || (Errors = {}));
