//// [objectTypesIdentityWithPrivates2.js]
// object types are identical structurally
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    return C;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);

function foo1(x) {
}

function foo2(x) {
}

function foo3(x) {
}

function foo4(x) {
}

var r = foo4(new C());
var r = foo4(new D());

function foo5(x) {
}

function foo6(x) {
}
