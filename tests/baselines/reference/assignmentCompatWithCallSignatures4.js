//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithCallSignatures4.ts] ////

//// [assignmentCompatWithCallSignatures4.ts]
// These are mostly permitted with the current loose rules. All ok unless otherwise noted.

namespace Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    namespace WithNonGenericSignaturesInBaseType {
        // target type with non-generic call signatures
        declare var a2: (x: number) => string[];
        declare var a7: (x: (arg: Base) => Derived) => (r: Base) => Derived2;
        declare var a8: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
        declare var a10: (...x: Base[]) => Base;
        declare var a11: (x: { foo: string }, y: { foo: string; bar: string }) => Base;
        declare var a12: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
        declare var a14: {
                (x: number): number[];
                (x: string): string[];
            };
        declare var a15: (x: { a: string; b: number }) => number;
        declare var a16: {
                (x: {
                    (a: number): number;
                    (a?: number): number;
                }): number[];
                (x: {
                    (a: boolean): boolean;
                    (a?: boolean): boolean;
                }): boolean[];
            };
        declare var a17: {
                (x: {
                    <T extends Derived>(a: T): T;
                    <T extends Base>(a: T): T;
                }): any[];
                (x: {
                    <T extends Derived2>(a: T): T;
                    <T extends Base>(a: T): T;
                }): any[];
            };

        declare var b2: <T, U>(x: T) => U[]; 
        a2 = b2;
        b2 = a2;

        declare var b7: <T extends Base, U extends Derived, V extends Derived2>(x: (arg: T) => U) => (r: T) => V;
        a7 = b7;
        b7 = a7;

        declare var b8: <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: number; }) => U) => (r: T) => U; 
        a8 = b8; // error, { foo: number } and Base are incompatible
        b8 = a8; // error, { foo: number } and Base are incompatible

        
        declare var b10: <T extends Derived>(...x: T[]) => T; 
        a10 = b10;
        b10 = a10;

        declare var b11: <T extends Derived>(x: T, y: T) => T; 
        a11 = b11;
        b11 = a11;

        declare var b12: <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => T; 
        a12 = b12;
        b12 = a12;

        declare var b15: <T>(x: { a: T; b: T }) => T; 
        a15 = b15;
        b15 = a15;

        declare var b15a: <T extends Base>(x: { a: T; b: T }) => number; 
        a15 = b15a;
        b15a = a15;

        declare var b16: <T>(x: (a: T) => T) => T[];
        a16 = b16;
        b16 = a16;

        declare var b17: <T>(x: (a: T) => T) => any[];
        a17 = b17;
        b17 = a17;
    }

    namespace WithGenericSignaturesInBaseType {
        // target type has generic call signature
        declare var a2: <T>(x: T) => T[];
        declare var b2: <T>(x: T) => string[];
        a2 = b2;
        b2 = a2;

        // target type has generic call signature
        declare var a3: <T>(x: T) => string[];
        declare var b3: <T>(x: T) => T[]; 
        a3 = b3;
        b3 = a3;
    }
}

//// [assignmentCompatWithCallSignatures4.js]
// These are mostly permitted with the current loose rules. All ok unless otherwise noted.
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
        a2 = b2;
        b2 = a2;
        a7 = b7;
        b7 = a7;
        a8 = b8; // error, { foo: number } and Base are incompatible
        b8 = a8; // error, { foo: number } and Base are incompatible
        a10 = b10;
        b10 = a10;
        a11 = b11;
        b11 = a11;
        a12 = b12;
        b12 = a12;
        a15 = b15;
        b15 = a15;
        a15 = b15a;
        b15a = a15;
        a16 = b16;
        b16 = a16;
        a17 = b17;
        b17 = a17;
    })(WithNonGenericSignaturesInBaseType || (WithNonGenericSignaturesInBaseType = {}));
    var WithGenericSignaturesInBaseType;
    (function (WithGenericSignaturesInBaseType) {
        a2 = b2;
        b2 = a2;
        a3 = b3;
        b3 = a3;
    })(WithGenericSignaturesInBaseType || (WithGenericSignaturesInBaseType = {}));
})(Errors || (Errors = {}));
