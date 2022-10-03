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