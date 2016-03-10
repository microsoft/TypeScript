//// [derivedClassOverridesProtectedMembers4.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
}

class Derived1 extends Base {
    public a: typeof x;
}

class Derived2 extends Derived1 {
    protected a: typeof x; // Error, parent was public
}

//// [derivedClassOverridesProtectedMembers4.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var x;
var y;
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    return Derived1;
}(Base));
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
}(Derived1));
