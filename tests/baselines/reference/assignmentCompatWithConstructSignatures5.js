//// [assignmentCompatWithConstructSignatures5.ts]
// checking assignment compat for function types. All valid

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
class OtherDerived extends Base { bing: string; }

var a: new <T>(x: T) => T[];
var a2: new <T>(x: T) => string[];
var a3: new <T>(x: T) => void;
var a4: new <T, U>(x: T, y: U) => string;
var a5: new <T, U>(x: new (arg: T) => U) => T;
var a6: new <T extends Base>(x: new (arg: T) => Derived) => T;
var a11: new <T>(x: { foo: T }, y: { foo: T; bar: T }) => Base;
var a15: new <T>(x: { a: T; b: T }) => T[];
var a16: new <T extends Base>(x: { a: T; b: T }) => T[];
var a17: {
    new <T extends Derived>(x: new (a: T) => T): T[];
    new <T extends Base>(x: new (a: T) => T): T[];        
};
var a18: {
    new (x: {
        new <T extends Derived>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
    new (x: {
        new <T extends Derived2>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
};

var b: new <T>(x: T) => T[]; 
a = b; // ok
b = a; // ok
var b2: new <T>(x: T) => string[]; 
a2 = b2; // ok
b2 = a2; // ok
var b3: new <T>(x: T) => T; 
a3 = b3; // ok
b3 = a3; // ok
var b4: new <T, U>(x: T, y: U) => string; 
a4 = b4; // ok
b4 = a4; // ok
var b5: new <T, U>(x: new (arg: T) => U) => T; 
a5 = b5; // ok
b5 = a5; // ok
var b6: new <T extends Base, U extends Derived>(x: new (arg: T) => U) => T; 
a6 = b6; // ok
b6 = a6; // ok
var b11: new <T, U>(x: { foo: T }, y: { foo: U; bar: U }) => Base; 
a11 = b11; // ok
b11 = a11; // ok
var b15: new <U, V>(x: { a: U; b: V; }) => U[]; 
a15 = b15; // ok
b15 = a15; // ok
var b16: new <T>(x: { a: T; b: T }) => T[]; 
a15 = b16; // ok
b15 = a16; // ok
var b17: new <T>(x: new (a: T) => T) => T[]; 
a17 = b17; // ok
b17 = a17; // ok
var b18: new (x: new <T>(a: T) => T) => any[]; 
a18 = b18; // ok
b18 = a18; // ok


//// [assignmentCompatWithConstructSignatures5.js]
// checking assignment compat for function types. All valid
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
var a11;
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
var b11;
a11 = b11; // ok
b11 = a11; // ok
var b15;
a15 = b15; // ok
b15 = a15; // ok
var b16;
a15 = b16; // ok
b15 = a16; // ok
var b17;
a17 = b17; // ok
b17 = a17; // ok
var b18;
a18 = b18; // ok
b18 = a18; // ok
