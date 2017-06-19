//// [wrappedAndRecursiveConstraints4.ts]
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
var r = c.foo('');
var r2 = r({ length: 3, charAt: (x: number) => { '' } }); // error

//// [wrappedAndRecursiveConstraints4.js]
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
var r = c.foo('');
var r2 = r({ length: 3, charAt: function (x) {
        '';
    } }); // error
