//// [emitRestParameters.ts]
function bar(...rest) { }
function foo(x: number, y: string, ...rest) { }

class C {
    constructor(name: string, ...rest) { }

    public bar(...rest) { }
    public foo(x: number, ...rest) { }
}

class D {
    constructor(...rest) { }

    public bar(...rest) { }
    public foo(x: number, ...rest) { }
}

var funcExp = (...rest) => { }
var funcExp1 = (X: number, ...rest) => { }

var obj: {
    func1: (...rest) => void
}

var obj2 = {
    func(...rest) { }
}

var x = function (...rest) { }
var y = (function (...rest) { })()


//// [emitRestParameters.js]
function bar() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i - 0] = arguments[_i];
    }
}
function foo(x, y) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
}
var C = (function () {
    function C(name) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    C.prototype.bar = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
    };
    C.prototype.foo = function (x) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    };
    return C;
})();
var D = (function () {
    function D() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
    }
    D.prototype.bar = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
    };
    D.prototype.foo = function (x) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    };
    return D;
})();
var funcExp = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i - 0] = arguments[_i];
    }
};
var funcExp1 = function (X) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
};
var obj;
var obj2 = {
    func: function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
    }
};
var x = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i - 0] = arguments[_i];
    }
};
var y = (function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i - 0] = arguments[_i];
    }
})();
