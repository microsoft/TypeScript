//// [subtypesOfTypeParameterWithConstraints4.js]
// checking whether other types are subtypes of type parameters with constraints
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
function f(t, u, v) {
    // error
    var r = true ? t : u;
    var r = true ? u : t;

    // error
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // error
    var r3 = true ? v : u;
    var r3 = true ? u : v;

    // ok
    var r4 = true ? t : new Foo();
    var r4 = true ? new Foo() : t;

    // ok
    var r5 = true ? u : new Foo();
    var r5 = true ? new Foo() : u;

    // BUG, should be error
    var r6 = true ? v : new Foo();
    var r6 = true ? new Foo() : v;
}

var B1 = (function () {
    function B1() {
    }
    return B1;
})();

var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        _super.apply(this, arguments);
    }
    return D1;
})(B1);

var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(B1);

var D3 = (function (_super) {
    __extends(D3, _super);
    function D3() {
        _super.apply(this, arguments);
    }
    return D3;
})(B1);

var D4 = (function (_super) {
    __extends(D4, _super);
    function D4() {
        _super.apply(this, arguments);
    }
    return D4;
})(B1);

var D5 = (function (_super) {
    __extends(D5, _super);
    function D5() {
        _super.apply(this, arguments);
    }
    return D5;
})(B1);

var D6 = (function (_super) {
    __extends(D6, _super);
    function D6() {
        _super.apply(this, arguments);
    }
    return D6;
})(B1);

var D7 = (function (_super) {
    __extends(D7, _super);
    function D7() {
        _super.apply(this, arguments);
    }
    return D7;
})(B1);

var D8 = (function (_super) {
    __extends(D8, _super);
    function D8() {
        _super.apply(this, arguments);
    }
    return D8;
})(B1);

var D9 = (function (_super) {
    __extends(D9, _super);
    function D9() {
        _super.apply(this, arguments);
    }
    return D9;
})(B1);
