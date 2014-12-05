//// [emitDefaultParametersES6.ts]
function foo(x: string, y = 10) { }
function baz(x: string, y = 5, ...rest) { }
function bar(y = 10) { }
function bar1(y = 10, ...rest) { }

class C {
    constructor(t:boolean, z: string, x: number, y = "hello") { }

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
var y = (function (num=10, boo = false, ...rest) { })()
var z = (function (num: number, boo = false, ...rest) { })(10)


//// [emitDefaultParametersES6.js]
function foo(x, y = 10) {
}
function baz(x, y = 5, ...rest) {
}
function bar(y = 10) {
}
function bar1(y = 10, ...rest) {
}
var C = (function () {
    function C(t, z, x, y = "hello") {
    }
    C.prototype.foo = function (x, t = false) {
    };
    C.prototype.foo1 = function (x, t = false, ...rest) {
    };
    C.prototype.bar = function (t = false) {
    };
    C.prototype.boo = function (t = false, ...rest) {
    };
    return C;
})();
var D = (function () {
    function D(y = "hello") {
    }
    return D;
})();
var E = (function () {
    function E(y = "hello", ...rest) {
    }
    return E;
})();
var lambda1 = function (y = "hello") {
};
var lambda2 = function (x, y = "hello") {
};
var lambda3 = function (x, y = "hello", ...rest) {
};
var lambda4 = function (y = "hello", ...rest) {
};
var obj2 = {
    func1: function (y = 10, ...rest) {
    },
    func2: function (x = "hello") {
    },
    func3: function (x, z, y = "hello") {
    },
    func4: function (x, z, y = "hello", ...rest) {
    },
};
var x = function (str = "hello", ...rest) {
};
var y = (function (num = 10, boo = false, ...rest) {
})();
var z = (function (num, boo = false, ...rest) {
})(10);
