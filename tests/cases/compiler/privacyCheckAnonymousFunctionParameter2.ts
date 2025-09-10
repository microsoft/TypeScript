//@module: amd
//@declaration: true
export var x = 1;  // Makes this an external module 
interface Iterator<T> { x: T }

namespace Q {
    export function foo<T>(x: (a: Iterator<T>) => number) {
        return x;
    }
}

namespace Q {
    function bar() {
        foo(null);
    }
}