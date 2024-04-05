//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/callSignatureAssignabilityInInheritance3.ts] ////

//// [callSignatureAssignabilityInInheritance3.ts]
// checking subtype relations for function types as it relates to contextual signature instantiation
// error cases

module Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    module WithNonGenericSignaturesInBaseType {
        // base type with non-generic call signatures
        interface A {
            a2: (x: number) => string[];
            a7: (x: (arg: Base) => Derived) => (r: Base) => Derived2;
            a8: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived;
            a10: (...x: Base[]) => Base;
            a11: (x: { foo: string }, y: { foo: string; bar: string }) => Base;
            a12: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>;
            a14: {
                (x: number): number[];
                (x: string): string[];
            };
            a15: (x: { a: string; b: number }) => number;
            a16: {
                // type of parameter is overload set which means we can't do inference based on this type
                (x: {
                    (a: number): number;
                    (a?: number): number;
                }): number[];
                (x: {
                    (a: boolean): boolean;
                    (a?: boolean): boolean;
                }): boolean[];
            };
            a17: {
                (x: {
                    <T extends Derived>(a: T): T;
                    <T extends Base>(a: T): T;
                }): any[];
                (x: {
                    <T extends Derived2>(a: T): T;
                    <T extends Base>(a: T): T;
                }): any[];
            };
        }

        interface I extends A {
            a2: <T, U>(x: T) => U[]; // error, contextual signature instantiation doesn't relate return types so U is {}, not a subtype of string[]
        }

        interface I2<T, U> extends A {
            a2: (x: T) => U[]; // error, no contextual signature instantiation since I2.a2 is not generic
        }

        interface I3 extends A {
            // valid, no inferences for V so it defaults to Derived2
            a7: <T extends Base, U extends Derived, V extends Derived2>(x: (arg: T) => U) => (r: T) => V;
        }

        interface I4 extends A {
            a8: <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: number; }) => U) => (r: T) => U; // error, type mismatch
        }

        interface I4B extends A {
            a10: <T extends Derived>(...x: T[]) => T; // valid, parameter covariance works even after contextual signature instantiation
        }

        interface I4C extends A {
            a11: <T extends Derived>(x: T, y: T) => T; // valid, even though x is a Base, parameter covariance works even after contextual signature instantiation
        }

        interface I4E extends A {
            a12: <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => T; // valid, no inferences for T, defaults to Array<Derived2>
        }

        interface I6 extends A {
            a15: <T>(x: { a: T; b: T }) => T; // error, T is {} which isn't an acceptable return type
        }

        interface I7 extends A {
            a15: <T extends Base>(x: { a: T; b: T }) => number; // error, T defaults to Base, which is not compatible with number or string
        }

        interface I8 extends A {
            // ok, we relate each signature of a16 to b16, and within that, we make inferences from two different signatures in the respective A.a16 signature
            a16: <T>(x: (a: T) => T) => T[];
        }

        interface I9 extends A {
            a17: <T>(x: (a: T) => T) => any[]; // valid, target is more constrained than source, so it is safe in the traditional constraint-contravariant fashion
        }
    }

    module WithGenericSignaturesInBaseType {
        // base type has generic call signature
        interface B {
            a2: <T>(x: T) => T[];
        }

        interface I6 extends B {
            a2: <T>(x: T) => string[]; // error
        }

        // base type has generic call signature
        interface C {
            a2: <T>(x: T) => string[];
        }

        interface I7 extends C {
            a2: <T>(x: T) => T[]; // error
        }
    }
}

//// [callSignatureAssignabilityInInheritance3.js]
// checking subtype relations for function types as it relates to contextual signature instantiation
// error cases
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
})(Errors || (Errors = {}));
