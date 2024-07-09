//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/typeParameterUsedAsTypeParameterConstraint4.ts] ////

//// [typeParameterUsedAsTypeParameterConstraint4.ts]
// Type parameters are in scope in their own and other type parameter lists
// Some negative cases

class C<T, U extends T, V extends U> {
    z: W; // error
    foo<W extends V>(x: W): T {
        var r: T;
        return x;
    }
}

interface I<T, U extends T, V extends U> {
    x: T;
    y: U;
    z: W; // error
    foo<W extends V>(x: W): T;
}

function foo<T, U extends T>(x: T, y: U): V { // error
    function bar<V extends T, W extends U>(): X { // error
        function baz<X extends W, Y extends V>(a: X, b: Y): T {
            x = y;
            return y;
        }
    }
}

function foo2<U extends T, T>(x: T, y: U): W { // error
    function bar<V extends T, W extends U>(): Y { // error
        function baz<X extends W, Y extends V>(a: X, b: Y): T {
            x = y;
            return y;
        }
    }
}

var f3 = <T, U extends T>(x: T, y: U) => {
    function bar<V extends T, W extends U>(r: X, s: Y) { // error
        var g = <X extends W, Y extends V>(a: X, b: Y): T => {
            x = y;
            return y;
        }
    }
}

var f4 = <U extends T, T>(x: V, y: X) => { // error
    function bar<V extends T, W extends U>() {
        var g = <X extends W, Y extends V>(a: X, b: Y): T => {
            x = y;
            return y;
        }
    }
}

//// [typeParameterUsedAsTypeParameterConstraint4.js]
// Type parameters are in scope in their own and other type parameter lists
// Some negative cases
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        var r;
        return x;
    };
    return C;
}());
function foo(x, y) {
    function bar() {
        function baz(a, b) {
            x = y;
            return y;
        }
    }
}
function foo2(x, y) {
    function bar() {
        function baz(a, b) {
            x = y;
            return y;
        }
    }
}
var f3 = function (x, y) {
    function bar(r, s) {
        var g = function (a, b) {
            x = y;
            return y;
        };
    }
};
var f4 = function (x, y) {
    function bar() {
        var g = function (a, b) {
            x = y;
            return y;
        };
    }
};
