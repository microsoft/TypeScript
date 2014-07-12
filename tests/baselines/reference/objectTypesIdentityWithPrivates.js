//// [objectTypesIdentityWithPrivates.js]
// object types are identical structurally
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    return A;
})();

var B = (function () {
    function B() {
    }
    return B;
})();

var C = (function () {
    function C() {
    }
    return C;
})();

var PA = (function (_super) {
    __extends(PA, _super);
    function PA() {
        _super.apply(this, arguments);
    }
    return PA;
})(A);

var PB = (function (_super) {
    __extends(PB, _super);
    function PB() {
        _super.apply(this, arguments);
    }
    return PB;
})(B);

var a;
var b = { foo: '' };

function foo1(x) {
}

function foo1b(x) {
}

function foo1c(x) {
}

function foo2(x) {
}

function foo3(x) {
}

function foo4(x) {
}

function foo5(x) {
}

function foo5b(x) {
}

function foo5c(x) {
}

function foo5d(x) {
}

function foo6(x) {
}

function foo7(x) {
}

function foo8(x) {
}

function foo9(x) {
}

function foo10(x) {
}

function foo11(x) {
}

function foo11b(x) {
}

function foo11c(x) {
}

function foo12(x) {
}

function foo13(x) {
}

function foo14(x) {
}

function foo15(x) {
}

function foo16(x) {
}
