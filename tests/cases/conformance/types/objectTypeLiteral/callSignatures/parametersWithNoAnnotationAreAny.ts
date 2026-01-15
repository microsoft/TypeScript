function foo(x) { return x; }
var f = function foo(x) { return x; }
var f2 = (x) => x;
var f3 = <T>(x) => x;

class C {
    foo(x) {
        return x;
    }
}

interface I {
    foo(x);
    foo2(x, y);
}

var a: {
    foo(x);
}

var b = {
    foo(x) {
        return x;
    },
    a: function foo(x) {
        return x;
    },
    b: (x) => x
}