//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithConstructSignatures4.ts] ////

//// [assignmentCompatWithConstructSignatures4.ts]
// checking assignment compatibility relations for function types.

namespace Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    namespace WithNonGenericSignaturesInBaseType {
        // target type with non-generic call signatures
        declare var a2: new (x: number) => string[];
        declare var a7: new (x: (arg: Base) => Derived) => (r: Base) => Derived2;
        declare var a8: new (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
        declare var a10: new (...x: Base[]) => Base;
        declare var a11: new (x: { foo: string }, y: { foo: string; bar: string }) => Base;
        declare var a12: new (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
        declare var a14: {
                new (x: number): number[];
                new (x: string): string[];
            };
        declare var a15: new (x: { a: string; b: number }) => number;
        declare var a16: {
                new (x: {
                    new (a: number): number;
                    new (a?: number): number;
                }): number[];
                new (x: {
                    new (a: boolean): boolean;
                    new (a?: boolean): boolean;
                }): boolean[];
            };
        declare var a17: {
                new (x: {
                    new <T extends Derived>(a: T): T;
                    new <T extends Base>(a: T): T;
                }): any[];
                new (x: {
                    new <T extends Derived2>(a: T): T;
                    new <T extends Base>(a: T): T;
                }): any[];
            };

        declare var b2: new <T, U>(x: T) => U[]; 
        a2 = b2; // ok
        b2 = a2; // ok

        declare var b7: new <T extends Base, U extends Derived, V extends Derived2>(x: (arg: T) => U) => (r: T) => V;
        a7 = b7; // ok
        b7 = a7; // ok

        declare var b8: new <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: number; }) => U) => (r: T) => U; 
        a8 = b8; // error, type mismatch
        b8 = a8; // error

        
        declare var b10: new <T extends Derived>(...x: T[]) => T; 
        a10 = b10; // ok
        b10 = a10; // ok

        declare var b11: new <T extends Derived>(x: T, y: T) => T; 
        a11 = b11; // ok
        b11 = a11; // ok

        declare var b12: new <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => T; 
        a12 = b12; // ok
        b12 = a12; // ok

        declare var b15: new <T>(x: { a: T; b: T }) => T; 
        a15 = b15; // ok
        b15 = a15; // ok

        declare var b15a: new <T extends Base>(x: { a: T; b: T }) => number; 
        a15 = b15a; // ok
        b15a = a15; // ok

        declare var b16: new <T>(x: (a: T) => T) => T[];
        a16 = b16; // error
        b16 = a16; // error

        declare var b17: new <T>(x: (a: T) => T) => any[];
        a17 = b17; // error
        b17 = a17; // error
    }

    namespace WithGenericSignaturesInBaseType {
        // target type has generic call signature
        declare var a2: new <T>(x: T) => T[];
        declare var b2: new <T>(x: T) => string[];
        a2 = b2; // ok
        b2 = a2; // ok

        // target type has generic call signature
        declare var a3: new <T>(x: T) => string[];
        declare var b3: new <T>(x: T) => T[]; 
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
        a2 = b2; // ok
        b2 = a2; // ok
        a7 = b7; // ok
        b7 = a7; // ok
        a8 = b8; // error, type mismatch
        b8 = a8; // error
        a10 = b10; // ok
        b10 = a10; // ok
        a11 = b11; // ok
        b11 = a11; // ok
        a12 = b12; // ok
        b12 = a12; // ok
        a15 = b15; // ok
        b15 = a15; // ok
        a15 = b15a; // ok
        b15a = a15; // ok
        a16 = b16; // error
        b16 = a16; // error
        a17 = b17; // error
        b17 = a17; // error
    })(WithNonGenericSignaturesInBaseType || (WithNonGenericSignaturesInBaseType = {}));
    var WithGenericSignaturesInBaseType;
    (function (WithGenericSignaturesInBaseType) {
        a2 = b2; // ok
        b2 = a2; // ok
        a3 = b3; // ok
        b3 = a3; // ok
    })(WithGenericSignaturesInBaseType || (WithGenericSignaturesInBaseType = {}));
})(Errors || (Errors = {}));
