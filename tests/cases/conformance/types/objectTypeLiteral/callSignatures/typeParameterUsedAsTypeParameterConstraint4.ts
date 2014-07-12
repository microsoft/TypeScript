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