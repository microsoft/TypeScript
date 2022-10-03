//@module: amd
//@declaration: true
export var x = 1;  // Makes this an external module 
interface Iterator<T> { x: T }

module Q {
    export function foo<T>(x: (a: Iterator<T>) => number) {
        return x;
    }
}

module Q {
    function bar() {
        foo(null);
    }
}