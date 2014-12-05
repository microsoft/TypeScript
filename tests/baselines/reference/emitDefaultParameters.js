//// [emitDefaultParameters.ts]
function foo(x: string, y = 10) { }
function baz(x: string, y = 5, ...rest) { }
function bar(y = 10) { }
function bar1(y = 10, ...rest) { }

class C {
    constructor(t: boolean, z: string, x: number, y = "hello") { }

    public foo(x: string, t = false) { }
    public foo1(x: string, t = false, ...rest) { }
    public bar(t = false) { }
    public boo(t = false, ...rest) { }
}

class D {
    constructor(y = "hello") { }
}

class E {
    constructor(y = "hello", ...rest) { }
}

var lambda1 = (y = "hello") => { }
var lambda2 = (x: number, y = "hello") => { }
var lambda3 = (x: number, y = "hello", ...rest) => { }
var lambda4 = (y = "hello", ...rest) => { }

var obj2 = {
    func1(y = 10, ...rest) { },
    func2(x = "hello") { },
    func3(x: string, z: number, y = "hello") { },
    func4(x: string, z: number, y = "hello", ...rest) { },
}

var x = function (str = "hello", ...rest) { }
var y = (function (num = 10, boo = false, ...rest) { })()
var z = (function (num: number, boo = false, ...rest) { })(10)


//// [emitDefaultParameters.js]
function foo(x, y) {
    if (y === void 0) { y = 10; }
}
function baz(x, y) {
    if (y === void 0) { y = 5; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
}
function bar(y) {
    if (y === void 0) { y = 10; }
}
function bar1(y) {
    if (y === void 0) { y = 10; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}
var C = (function () {
    function C(t, z, x, y) {
        if (y === void 0) { y = "hello"; }
    }
    C.prototype.foo = function (x, t) {
        if (t === void 0) { t = false; }
    };
    C.prototype.foo1 = function (x, t) {
        if (t === void 0) { t = false; }
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
    };
    C.prototype.bar = function (t) {
        if (t === void 0) { t = false; }
    };
    C.prototype.boo = function (t) {
        if (t === void 0) { t = false; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    };
    return C;
})();
var D = (function () {
    function D(y) {
        if (y === void 0) { y = "hello"; }
    }
    return D;
})();
var E = (function () {
    function E(y) {
        if (y === void 0) { y = "hello"; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    return E;
})();
var lambda1 = function (y) {
    if (y === void 0) { y = "hello"; }
};
var lambda2 = function (x, y) {
    if (y === void 0) { y = "hello"; }
};
var lambda3 = function (x, y) {
    if (y === void 0) { y = "hello"; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
};
var lambda4 = function (y) {
    if (y === void 0) { y = "hello"; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
};
var obj2 = {
    func1: function (y) {
        if (y === void 0) { y = 10; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    },
    func2: function (x) {
        if (x === void 0) { x = "hello"; }
    },
    func3: function (x, z, y) {
        if (y === void 0) { y = "hello"; }
    },
    func4: function (x, z, y) {
        if (y === void 0) { y = "hello"; }
        var rest = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            rest[_i - 3] = arguments[_i];
        }
    },
};
var x = function (str) {
    if (str === void 0) { str = "hello"; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
};
var y = (function (num, boo) {
    if (num === void 0) { num = 10; }
    if (boo === void 0) { boo = false; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
})();
var z = (function (num, boo) {
    if (boo === void 0) { boo = false; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
})(10);
