//// [incompatibleTypes.js]
var C1 = (function () {
    function C1() {
    }
    C1.prototype.p1 = function () {
        return "s";
    };
    return C1;
})();

var C2 = (function () {
    function C2() {
    }
    C2.prototype.p1 = function (n) {
        return 0;
    };
    return C2;
})();

var C3 = (function () {
    function C3() {
    }
    return C3;
})();

var C4 = (function () {
    function C4() {
    }
    return C4;
})();

function if1(a) {
}
var c1;
var c2;
if1(c1);

function of1(a) {
    return null;
}

of1({ e: 0, f: 0 });

function foo(fn) {
}

function bar() {
    var map;
    foo(function () {
        map = {};
    });
}

var o1 = { e: 0, f: 0 };

var a1 = [{ e: 0, f: 0 }, { e: 0, f: 0 }, { e: 0, g: 0 }];

var i1c1 = 5;

var fp1 = function (a) {
    return 0;
};
