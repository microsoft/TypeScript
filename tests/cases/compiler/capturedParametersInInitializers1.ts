// @target: es6
// ok - usage is deferred
function foo1(y = class {c = x}, x = 1) {
    new y().c;
}

// ok - used in file
function foo2(y = function(x: typeof z) {}, z = 1) {
    
}

// ok -used in type
let a;
function foo3(y = { x: <typeof z>a }, z = 1) {
    
}

// error - used before declaration
function foo4(y = {z}, z = 1) {
}

// error - used before declaration, IIFEs are inlined
function foo5(y = (() => z)(), z = 1) {
}

// ok - IIFE inside another function
function foo6(y = () => (() => z)(), z = 1) {
}

// ok - used inside immediately invoked generator function
function foo7(y = (function*() {yield z})(), z = 1) {
}

// ok - used inside immediately invoked async function
function foo8(y = (async () => z)(), z = 1) {
}

// error - used as computed name of method
function foo9(y = {[z]() { return z; }}, z = 1) {
}
