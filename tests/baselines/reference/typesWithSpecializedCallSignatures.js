//// [typesWithSpecializedCallSignatures.ts]
// basic uses of specialized signatures without errors

class Base { foo: string }
class Derived1 extends Base { bar: string }
class Derived2 extends Base { baz: string }

class C {
    foo(x: 'hi'): Derived1;
    foo(x: 'bye'): Derived2;
    foo(x: string): Base;
    foo(x) {
        return x;
    }
}
var c = new C();

interface I {
    foo(x: 'hi'): Derived1;
    foo(x: 'bye'): Derived2;
    foo(x: string): Base;
}
var i: I;

var a: {
    foo(x: 'hi'): Derived1;
    foo(x: 'bye'): Derived2;
    foo(x: string): Base;
};

c = i;
c = a;

i = c;
i = a;

a = c;
a = i;

var r1: Derived1 = c.foo('hi');
var r2: Derived2 = c.foo('bye');
var r3: Base = c.foo('hm');

//// [typesWithSpecializedCallSignatures.js]
// basic uses of specialized signatures without errors
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
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived1;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return x;
    };
    return C;
}());
var c = new C();
var i;
var a;
c = i;
c = a;
i = c;
i = a;
a = c;
a = i;
var r1 = c.foo('hi');
var r2 = c.foo('bye');
var r3 = c.foo('hm');
