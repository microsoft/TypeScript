//// [anyIdenticalToItself.ts]
function foo(x: any);
function foo(x: any);
function foo(x: any, y: number) { }

class C {
    get X(): any {
        var y: any;
        return y;
    }
    set X(v: any) {
    }
}

//// [anyIdenticalToItself.js]
function foo(x, y) { }
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        get: function () {
            var y;
            return y;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
