//// [constructSignatureAssignabilityInInheritance4.ts]
// checking subtype relations for function types as it relates to contextual signature instantiation

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

interface A { // T
    // M's
    a: new <T>(x: T) => T[];
    a2: new <T>(x: T) => string[];
    a3: new <T>(x: T) => void;
    a4: new <T, U>(x: T, y: U) => string;
    a5: new <T, U>(x: (arg: T) => U) => T;
    a6: new <T extends Base>(x: (arg: T) => Derived) => T;
    a11: new <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base;
    a15: new <T>(x: { a: T; b: T }) => T[];
    a16: new <T extends Base>(x: { a: T; b: T }) => T[];
    a17: {
        new <T extends Base>(x: T): T[];
        new <U extends Derived>(x: U): U[];
    };
    a18: {
        new <T extends Derived>(x: T): number[];
        new <U extends Base>(x: U): number[];
    };
    a19: {
        new <T extends Derived>(x: new (a: T) => T): T[];
        new <U extends Base>(x: new (a: U) => U): U[];
    };
    a20: {
        new (x: {
            new <T extends Derived>(a: T): T;
            new <U extends Base>(a: U): U;
        }): any[];
        new (x: {
            new <T extends Base>(a: T): T;
            new <U extends Derived2>(a: U): U;
        }): any[];
    };
}

// S's
interface I extends A {
    // N's
    a: new <T>(x: T) => T[]; // ok, instantiation of N is a subtype of M, T is number
    a2: new <T>(x: T) => string[]; // ok
    a3: new <T>(x: T) => T; // ok since Base returns void
    a4: new <T, U>(x: T, y: U) => string; // ok, instantiation of N is a subtype of M, T is string, U is number
    a5: new <T, U>(x: (arg: T) => U) => T; // ok, U is in a parameter position so inferences can be made
    a6: new <T extends Base, U extends Derived>(x: (arg: T) => U) => T; // ok, same as a5 but with object type hierarchy
    a11: new <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; // ok
    a15: new <U, V>(x: { a: U; b: V; }) => U[]; // ok, T = U, T = V
    a16: new <T>(x: { a: T; b: T }) => T[]; // ok, more general parameter type
    a17: new <T extends Base>(x: T) => T[]; // ok, more general parameter type
    a18: new <T extends Base>(x: T) => number[]; // ok, more general parameter type
    a19: new <T extends Base>(x: new (a: T) => T) => T[]; // ok
    a20: new (x: new <T extends Base>(a: T) => T) => any[]; // ok
}

//// [constructSignatureAssignabilityInInheritance4.js]
// checking subtype relations for function types as it relates to contextual signature instantiation
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
