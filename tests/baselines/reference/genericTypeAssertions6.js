//// [genericTypeAssertions6.ts]
class A<T,U> {
    constructor(x) {
        var y = <T>x;
        var z = <U>x;
    }

    f(x: T, y: U) {
        x = <T>y;
        y = <U>x;
    }
}

class B<T extends Date, U extends Date> extends A<T, U> {
    g(x: T) {
        var a: Date = x;
        var b = <Date>x;
        var c = <T>new Date();
        var d = <U>new Date();
        var e = <T><U>new Date();
    }
}

var b: B<Date, Date>;
var c: A<Date, Date> = <A<Date, Date>>b;

//// [genericTypeAssertions6.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A(x) {
        var y = x;
        var z = x;
    }
    A.prototype.f = function (x, y) {
        x = y;
        y = x;
    };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.g = function (x) {
        var a = x;
        var b = x;
        var c = new Date();
        var d = new Date();
        var e = new Date();
    };
    return B;
}(A));
var b;
var c = b;
