//// [tests/cases/conformance/expressions/functions/typeOfThisInFunctionExpression.ts] ////

//// [typeOfThisInFunctionExpression.ts]
// type of 'this' in FunctionExpression is Any

function fn() {
    var p = this;
    var p: any;
}

var t = function () {
    var p = this;
    var p: any;
}

var t2 = function f() {
    var x = this;
    var x: any;
}

class C {
    x = function () {
        var q: any;
        var q = this;
    }
    y = function ff() {
        var q: any;
        var q = this;
    }
}

module M {
    function fn() {
        var p = this;
        var p: any;
    }

    var t = function () {
        var p = this;
        var p: any;
    }

    var t2 = function f() {
        var x = this;
        var x: any;
    }

}

//// [typeOfThisInFunctionExpression.js]
function fn() {
    var p = this;
    var p;
}
var t = function () {
    var p = this;
    var p;
};
var t2 = function f() {
    var x = this;
    var x;
};
class C {
    x = function () {
        var q;
        var q = this;
    };
    y = function ff() {
        var q;
        var q = this;
    };
}
var M;
(function (M) {
    function fn() {
        var p = this;
        var p;
    }
    var t = function () {
        var p = this;
        var p;
    };
    var t2 = function f() {
        var x = this;
        var x;
    };
})(M || (M = {}));
