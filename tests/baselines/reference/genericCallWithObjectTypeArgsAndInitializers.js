//// [genericCallWithObjectTypeArgsAndInitializers.js]
// Generic typed parameters with initializers
function foo(x) {
    if (typeof x === "undefined") { x = null; }
    return x;
}
function foo2(x) {
    if (typeof x === "undefined") { x = undefined; }
    return x;
}
function foo3(x) {
    if (typeof x === "undefined") { x = 1; }
}
function foo4(x, y) {
    if (typeof y === "undefined") { y = x; }
}
function foo5(x, y) {
    if (typeof y === "undefined") { y = x; }
}
function foo6(x, y, z) {
    if (typeof z === "undefined") { z = y; }
}
function foo7(x, y) {
    if (typeof y === "undefined") { y = x; }
} // should be ok
