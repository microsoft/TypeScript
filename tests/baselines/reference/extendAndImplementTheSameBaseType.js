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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
    };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.baz = function () {
    };
    return D;
})(C);

var c;
var d = new D();
d.bar();
d.baz();
d.foo;
