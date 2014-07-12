//// [derivedClassWithoutExplicitConstructor3.js]
// automatic constructors with a class hieararchy of depth > 2
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
    function Derived(y, z) {
        _super.call(this, 2);
        this.b = '';
        this.b = y;
    }
    return Derived;
})(Base);

var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
        this.x = 1;
        this.y = 'hello';
    }
    return Derived2;
})(Derived);

var r = new Derived();
var r2 = new Derived2(1);
var r3 = new Derived('', '');

var Base2 = (function () {
    function Base2(x) {
        this.a = x;
    }
    return Base2;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D(y, z) {
        _super.call(this, 2);
        this.b = null;
        this.b = y;
    }
    return D;
})(Base);

var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
        this.x = 2;
        this.y = null;
    }
    return D2;
})(D);

var d = new D2();
var d2 = new D2(new Date());
var d3 = new D2(new Date(), new Date()); // ok
