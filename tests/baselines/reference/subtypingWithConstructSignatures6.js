//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithConstructSignatures6.ts] ////

//// [subtypingWithConstructSignatures6.ts]
// checking subtype relations for function types as it relates to contextual signature instantiation
// same as subtypingWithConstructSignatures4 but using class type parameters instead of generic signatures
// all are errors

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
}

// S's
interface I<T> extends A {
    a: new (x: T) => T[]; 
}

interface I2<T> extends A {
    a2: new (x: T) => string[]; 
}

interface I3<T> extends A {
    a3: new (x: T) => T;
}

interface I4<T> extends A {
    a4: new <U>(x: T, y: U) => string; 
}

interface I5<T> extends A {
    a5: new <U>(x: (arg: T) => U) => T; 
}

interface I7<T> extends A {
    a11: new <U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
}

interface I9<T> extends A {
    a16: new (x: { a: T; b: T }) => T[]; 
}

//// [subtypingWithConstructSignatures6.js]
// checking subtype relations for function types as it relates to contextual signature instantiation
// same as subtypingWithConstructSignatures4 but using class type parameters instead of generic signatures
// all are errors
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
