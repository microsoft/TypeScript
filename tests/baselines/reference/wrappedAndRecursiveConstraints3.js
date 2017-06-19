//// [wrappedAndRecursiveConstraints3.ts]
// no errors expected

class C<T extends { length: number }> {
    constructor(x: T) { }
    foo<U extends T>(x: U) {
        function bar<V extends U>(x: V) {
            return x;
        }
        return bar;
    }
}

var c = new C({ length: 2 });
var r = c.foo({ length: 3, charAt: (x: number) => { '' } });
var r2 = r('');

//// [wrappedAndRecursiveConstraints3.js]
// no errors expected
var C = /** @class */ (function () {
    function C(x) {
    }
    C.prototype.foo = function (x) {
        function bar(x) {
            return x;
        }
        return bar;
    };
    return C;
}());
var c = new C({ length: 2 });
var r = c.foo({ length: 3, charAt: function (x) {
        '';
    } });
var r2 = r('');
