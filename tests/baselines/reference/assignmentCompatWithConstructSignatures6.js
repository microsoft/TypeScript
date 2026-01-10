//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithConstructSignatures6.ts] ////

//// [assignmentCompatWithConstructSignatures6.ts]
// checking assignment compatibility relations for function types. All valid.

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

interface A {
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

declare var x: A;

declare var b: new <T>(x: T) => T[]; 
x.a = b;
b = x.a;
declare var b2: new <T>(x: T) => string[]; 
x.a2 = b2;
b2 = x.a2;
declare var b3: new <T>(x: T) => T;
x.a3 = b3;
b3 = x.a3;
declare var b4: new <T, U>(x: T, y: U) => string; 
x.a4 = b4;
b4 = x.a4;
declare var b5: new <T, U>(x: (arg: T) => U) => T; 
x.a5 = b5;
b5 = x.a5;
declare var b11: new <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
x.a11 = b11;
b11 = x.a11;
declare var b16: new <T>(x: { a: T; b: T }) => T[]; 
x.a16 = b16;
b16 = x.a16;

//// [assignmentCompatWithConstructSignatures6.js]
// checking assignment compatibility relations for function types. All valid.
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
x.a = b;
b = x.a;
x.a2 = b2;
b2 = x.a2;
x.a3 = b3;
b3 = x.a3;
x.a4 = b4;
b4 = x.a4;
x.a5 = b5;
b5 = x.a5;
x.a11 = b11;
b11 = x.a11;
x.a16 = b16;
b16 = x.a16;
