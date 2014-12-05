//// [emitRestParametersES6.ts]
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
var funcExp1 = (X:number, ...rest) => { }

var obj: {
    func1: (...rest) => void
}

var obj2 = {
    func(...rest) { }
}

var x = function (...rest) { }
var y = (function (...rest) { })()


//// [emitRestParametersES6.js]
function bar(...rest) {
}
function foo(x, y, ...rest) {
}
var C = (function () {
    function C(name, ...rest) {
    }
    C.prototype.bar = function (...rest) {
    };
    C.prototype.foo = function (x, ...rest) {
    };
    return C;
})();
var D = (function () {
    function D(...rest) {
    }
    D.prototype.bar = function (...rest) {
    };
    D.prototype.foo = function (x, ...rest) {
    };
    return D;
})();
var funcExp = function (...rest) {
};
var funcExp1 = function (X, ...rest) {
};
var obj;
var obj2 = {
    func: function (...rest) {
    }
};
var x = function (...rest) {
};
var y = (function (...rest) {
})();
