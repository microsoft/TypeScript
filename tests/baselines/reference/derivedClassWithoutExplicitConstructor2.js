//// [derivedClassWithoutExplicitConstructor2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base(x) {
        this.a = 1;
        this.a = x;
    }
    return Base;
})();

var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
        this.x = 1;
        this.y = 'hello';
    }
    return Derived;
})(Base);

var r = new Derived();
var r2 = new Derived(1);
var r3 = new Derived(1, 2);
var r4 = new Derived(1, 2, 3);

var Base2 = (function () {
    function Base2(x) {
        this.a = x;
    }
    return Base2;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
        this.x = 2;
        this.y = null;
    }
    return D;
})(Base2);

var d = new D();
var d2 = new D(new Date());
var d3 = new D(new Date(), new Date());
var d4 = new D(new Date(), new Date(), new Date());
