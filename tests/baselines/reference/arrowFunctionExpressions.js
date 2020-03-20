//// [arrowFunctionExpressions.ts]
// ArrowFormalParameters => AssignmentExpression is equivalent to ArrowFormalParameters => { return AssignmentExpression; }
var a = (p: string) => p.length;
var a = (p: string) => { return p.length; }

// Identifier => Block is equivalent to(Identifier) => Block
var b = j => { return 0; }
var b = (j) => { return 0; }

// Identifier => AssignmentExpression is equivalent to(Identifier) => AssignmentExpression
var c: number;
var d = n => c = n;
var d = (n) => c = n;
var d: (n: any) => any;

// Binding patterns in arrow functions
var p1 = ([a]) => { };
var p2 = ([...a]) => { };
var p3 = ([, a]) => { };
var p4 = ([, ...a]) => { };
var p5 = ([a = 1]) => { };
var p6 = ({ a }) => { };
var p7 = ({ a: { b } }) => { };
var p8 = ({ a = 1 }) => { };
var p9 = ({ a: { b = 1 } = { b: 1 } }) => { };
var p10 = ([{ value, done }]) => { };

// Arrow function used in class member initializer
// Arrow function used in class member function
class MyClass {
    m = (n) => n + 1;
    p = (n) => n && this;

    fn() {
        var m = (n) => n + 1;
        var p = (n) => n && this;
    }
}

// Arrow function used in arrow function
var arrrr = () => (m: number) => () => (n: number) => m + n;
var e = arrrr()(3)()(4);
var e: number;

// Arrow function used in arrow function used in function
function someFn() {
    var arr = (n: number) => (p: number) => p * n;
    arr(3)(4).toExponential();
}

// Arrow function used in function
function someOtherFn() {
    var arr = (n: number) => '' + n;
    arr(4).charAt(0);
}

// Arrow function used in nested function in function
function outerFn() {
    function innerFn() {
        var arrowFn = () => { };
        var p = arrowFn();
        var p: void;
    }
}

// Arrow function used in nested function in arrow function
var f = (n: string) => {
    function fn(x: number) {
        return () => n + x;
    }
    return fn(4);
}
var g = f('')();
var g: string;


// Arrow function used in nested function in arrow function in nested function
function someOuterFn() {
    var arr = (n: string) => {
        function innerFn() {
            return () => n.length;
        }
        return innerFn;
    }
    return arr;
}
var h = someOuterFn()('')()();
h.toExponential();

// Arrow function used in try/catch/finally in function
function tryCatchFn() {
    try {
        var x = () => this;
    } catch (e) {
        var t = () => e + this;
    } finally {
        var m = () => this + '';
    }
}


//// [arrowFunctionExpressions.js]
// ArrowFormalParameters => AssignmentExpression is equivalent to ArrowFormalParameters => { return AssignmentExpression; }
var a = function (p) { return p.length; };
var a = function (p) { return p.length; };
// Identifier => Block is equivalent to(Identifier) => Block
var b = function (j) { return 0; };
var b = function (j) { return 0; };
// Identifier => AssignmentExpression is equivalent to(Identifier) => AssignmentExpression
var c;
var d = function (n) { return c = n; };
var d = function (n) { return c = n; };
var d;
// Binding patterns in arrow functions
var p1 = function (_a) {
    var a = _a[0];
};
var p2 = function (_b) {
    var a = _b.slice(0);
};
var p3 = function (_c) {
    var a = _c[1];
};
var p4 = function (_d) {
    var a = _d.slice(1);
};
var p5 = function (_e) {
    var _f = _e[0], a = _f === void 0 ? 1 : _f;
};
var p6 = function (_g) {
    var a = _g.a;
};
var p7 = function (_h) {
    var b = _h.a.b;
};
var p8 = function (_j) {
    var _k = _j.a, a = _k === void 0 ? 1 : _k;
};
var p9 = function (_l) {
    var _m = _l.a, _o = (_m === void 0 ? { b: 1 } : _m).b, b = _o === void 0 ? 1 : _o;
};
var p10 = function (_p) {
    var _q = _p[0], value = _q.value, done = _q.done;
};
// Arrow function used in class member initializer
// Arrow function used in class member function
var MyClass = /** @class */ (function () {
    function MyClass() {
        var _this = this;
        this.m = function (n) { return n + 1; };
        this.p = function (n) { return n && _this; };
    }
    MyClass.prototype.fn = function () {
        var _this = this;
        var m = function (n) { return n + 1; };
        var p = function (n) { return n && _this; };
    };
    return MyClass;
}());
// Arrow function used in arrow function
var arrrr = function () { return function (m) { return function () { return function (n) { return m + n; }; }; }; };
var e = arrrr()(3)()(4);
var e;
// Arrow function used in arrow function used in function
function someFn() {
    var arr = function (n) { return function (p) { return p * n; }; };
    arr(3)(4).toExponential();
}
// Arrow function used in function
function someOtherFn() {
    var arr = function (n) { return '' + n; };
    arr(4).charAt(0);
}
// Arrow function used in nested function in function
function outerFn() {
    function innerFn() {
        var arrowFn = function () { };
        var p = arrowFn();
        var p;
    }
}
// Arrow function used in nested function in arrow function
var f = function (n) {
    function fn(x) {
        return function () { return n + x; };
    }
    return fn(4);
};
var g = f('')();
var g;
// Arrow function used in nested function in arrow function in nested function
function someOuterFn() {
    var arr = function (n) {
        function innerFn() {
            return function () { return n.length; };
        }
        return innerFn;
    };
    return arr;
}
var h = someOuterFn()('')()();
h.toExponential();
// Arrow function used in try/catch/finally in function
function tryCatchFn() {
    var _this = this;
    try {
        var x = function () { return _this; };
    }
    catch (e) {
        var t = function () { return e + _this; };
    }
    finally {
        var m = function () { return _this + ''; };
    }
}
