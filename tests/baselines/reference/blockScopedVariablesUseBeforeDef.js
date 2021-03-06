//// [blockScopedVariablesUseBeforeDef.ts]
function foo0() {
    let a = x;
    let x;
}

function foo1() {
    let a = () => x;
    let x;
}

function foo2() {
    let a = function () { return x; }
    let x;
}

function foo3() {
    class X {
        m() { return x;}
    }
    let x;
}

function foo4() {
    let y = class {
        m() { return x; }
    };
    let x;
}

function foo5() {
    let x = () => y;
    let y = () => x;
}

function foo6() {
    function f() {
        return x;
    }
    let x;
}

function foo7() {
    class A {
        a = x;
    }
    let x;
}

function foo8() {
    let y = class {
        a = x;
    }
    let x;
}

function foo9() {
    let y = class {
        static a = x;
    }
    let x;
}

function foo10() {
    class A {
        static a = x;
    }
    let x;
}

function foo11() {
    function f () {
        let y = class {
            static a = x;
        }
    }
    let x;
}

function foo12() {
    function f () {
        let y = class {
            a;
            constructor() {
                this.a = x;
            }
        }
    }
    let x;
}

function foo13() {
    let a = {
        get a() { return x } 
    }
    let x
}

function foo14() {
    let a = {
        a: x 
    }
    let x
}


//// [blockScopedVariablesUseBeforeDef.js]
function foo0() {
    var a = x;
    var x;
}
function foo1() {
    var a = function () { return x; };
    var x;
}
function foo2() {
    var a = function () { return x; };
    var x;
}
function foo3() {
    var X = /** @class */ (function () {
        function X() {
        }
        X.prototype.m = function () { return x; };
        return X;
    }());
    var x;
}
function foo4() {
    var y = /** @class */ (function () {
        function y() {
        }
        y.prototype.m = function () { return x; };
        return y;
    }());
    var x;
}
function foo5() {
    var x = function () { return y; };
    var y = function () { return x; };
}
function foo6() {
    function f() {
        return x;
    }
    var x;
}
function foo7() {
    var A = /** @class */ (function () {
        function A() {
            this.a = x;
        }
        return A;
    }());
    var x;
}
function foo8() {
    var y = /** @class */ (function () {
        function class_1() {
            this.a = x;
        }
        return class_1;
    }());
    var x;
}
function foo9() {
    var _a;
    var y = (_a = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _a.a = x,
        _a);
    var x;
}
function foo10() {
    var A = /** @class */ (function () {
        function A() {
        }
        A.a = x;
        return A;
    }());
    var x;
}
function foo11() {
    function f() {
        var _a;
        var y = (_a = /** @class */ (function () {
                function class_3() {
                }
                return class_3;
            }()),
            _a.a = x,
            _a);
    }
    var x;
}
function foo12() {
    function f() {
        var y = /** @class */ (function () {
            function class_4() {
                this.a = x;
            }
            return class_4;
        }());
    }
    var x;
}
function foo13() {
    var a = {
        get a() { return x; }
    };
    var x;
}
function foo14() {
    var a = {
        a: x
    };
    var x;
}
