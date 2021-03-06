//// [thisTypeErrors.ts]
var x1: this;
var x2: { a: this };
var x3: this[];

function f1(x: this): this {
    var y: this;
    return this;
}

interface I1 {
    a: { x: this };
    b: { (): this };
    c: { new (): this };
    d: { [x: string]: this };
    e: { f(x: this): this };
}

class C1 {
    a: { x: this };
    b: { (): this };
    c: { new (): this };
    d: { [x: string]: this };
    e: { f(x: this): this };
}

class C2 {
    static x: this;
    static y = <this>undefined;
    static foo(x: this): this {
        return undefined;
    }
}

namespace N1 {
    export var x: this;
    export var y = this;
}

class C3 {
    x1 = {
        g(x: this): this {
            return undefined;
        }
    }
    f() {
        function g(x: this): this {
            return undefined;
        }
        let x2 = {
            h(x: this): this {
                return undefined;
            }
        }
    }
}


//// [thisTypeErrors.js]
var x1;
var x2;
var x3;
function f1(x) {
    var y;
    return this;
}
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.foo = function (x) {
        return undefined;
    };
    C2.y = undefined;
    return C2;
}());
var N1;
(function (N1) {
    N1.y = this;
})(N1 || (N1 = {}));
var C3 = /** @class */ (function () {
    function C3() {
        this.x1 = {
            g: function (x) {
                return undefined;
            }
        };
    }
    C3.prototype.f = function () {
        function g(x) {
            return undefined;
        }
        var x2 = {
            h: function (x) {
                return undefined;
            }
        };
    };
    return C3;
}());
