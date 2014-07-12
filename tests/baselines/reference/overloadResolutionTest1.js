//// [overloadResolutionTest1.js]
function foo(bar) {
    return bar;
}
;

var x1 = foo([{ a: true }]);
var x11 = foo([{ a: 0 }]);
var x111 = foo([{ a: "s" }]);
var x1111 = foo([{ a: null }]);

function foo2(bar) {
    return bar;
}
;

var x2 = foo2({ a: 0 });
var x3 = foo2({ a: true });
var x4 = foo2({ a: "s" });

function foo4(bar) {
    return bar;
}
;
var x = foo4({ a: true }); // error
