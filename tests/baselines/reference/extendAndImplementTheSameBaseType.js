//// [extendAndImplementTheSameBaseType.ts]
class C {
    foo: number
    bar() {}
}
class D extends C implements C {
    baz() { }
}

var c: C;
var d: D = new D();
d.bar();
d.baz();
d.foo;

//// [extendAndImplementTheSameBaseType.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () { };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.baz = function () { };
    return D;
})(C);
var c;
var d = new D();
d.bar();
d.baz();
d.foo;
