//// [capturedParametersInInitializers1.ts]
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

//// [capturedParametersInInitializers1.js]
// ok - usage is deferred
function foo1(y, x) {
    if (y === void 0) { y = (function () {
        function class_1() {
            this.c = x;
        }
        return class_1;
    }()); }
    if (x === void 0) { x = 1; }
    new y().c;
}
// ok - used in file
function foo2(y, z) {
    if (y === void 0) { y = function (x) { }; }
    if (z === void 0) { z = 1; }
}
// ok -used in type
var a;
function foo3(y, z) {
    if (y === void 0) { y = { x: a }; }
    if (z === void 0) { z = 1; }
}
