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