//// [tests/cases/compiler/genericWithOpenTypeParameters1.ts] ////

//// [genericWithOpenTypeParameters1.ts]
class B<T> {
   foo(x: T): T { return null; }
}

var x: B<number>;
x.foo(1); // no error
var f = <T>(x: B<T>) => { return x.foo(1); } // error
var f2 = <T>(x: B<T>) => { return x.foo<T>(1); } // error
var f3 = <T>(x: B<T>) => { return x.foo<number>(1); } // error
var f4 = (x: B<number>) => { return x.foo(1); } // no error


//// [genericWithOpenTypeParameters1.js]
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function (x) { return null; };
    return B;
}());
var x;
x.foo(1); // no error
var f = function (x) { return x.foo(1); }; // error
var f2 = function (x) { return x.foo(1); }; // error
var f3 = function (x) { return x.foo(1); }; // error
var f4 = function (x) { return x.foo(1); }; // no error
