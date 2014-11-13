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
function foo() {
    var x = (arguments[0] === void 0) ? null : arguments[0];
    return x;
} // ok
function foo2() {
    var x = (arguments[0] === void 0) ? undefined : arguments[0];
    return x;
} // ok
function foo3() {
    var x = (arguments[0] === void 0) ? 1 : arguments[0];
} // error
function foo4(x) {
    var y = (arguments[1] === void 0) ? x : arguments[1];
} // error
function foo5(x) {
    var y = (arguments[1] === void 0) ? x : arguments[1];
} // ok
function foo6(x, y) {
    var z = (arguments[2] === void 0) ? y : arguments[2];
} // error
function foo7(x) {
    var y = (arguments[1] === void 0) ? x : arguments[1];
} // should be ok
