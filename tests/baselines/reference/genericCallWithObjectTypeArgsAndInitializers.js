//// [genericCallWithObjectTypeArgsAndInitializers.ts]
// Generic typed parameters with initializers

function foo<T>(x: T = null) { return x; } // ok
function foo2<T>(x: T = undefined) { return x; } // ok
function foo3<T extends Number>(x: T = 1) { } // error
function foo4<T, U extends T>(x: T, y: U = x) { } // error
function foo5<T, U extends T>(x: U, y: T = x) { } // ok
function foo6<T, U extends T, V extends U>(x: T, y: U, z: V = y) { } // error
function foo7<T, U extends T, V extends U>(x: V, y: U = x) { } // should be ok

//// [genericCallWithObjectTypeArgsAndInitializers.js]
// Generic typed parameters with initializers
function foo(x) {
    if (x === void 0) { x = null; }
    return x;
} // ok
function foo2(x) {
    if (x === void 0) { x = undefined; }
    return x;
} // ok
function foo3(x) { } // error
function foo4(x, y) { } // error
function foo5(x, y) { } // ok
function foo6(x, y, z) { } // error
function foo7(x, y) { } // should be ok
