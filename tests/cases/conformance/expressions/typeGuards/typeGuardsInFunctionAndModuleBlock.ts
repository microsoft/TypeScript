// typeguards are scoped in function/module block

function foo(x: number | string | boolean) {
    return typeof x === "string"
        ? x
        : function f() {
            var b = x; // number | boolean
            return typeof x === "boolean"
                ? x.toString() // boolean
                : x.toString(); // number
        } ();
}
function foo2(x: number | string | boolean) {
    return typeof x === "string"
        ? x
        : function f(a: number | boolean) {
            var b = x; // new scope - number | boolean
            return typeof x === "boolean"
                ? x.toString() // boolean
                : x.toString(); // number
        } (x); // x here is narrowed to number | boolean
}
function foo3(x: number | string | boolean) {
    return typeof x === "string"
        ? x
        : (() => {
            var b = x; // new scope - number | boolean
            return typeof x === "boolean"
                ? x.toString() // boolean
                : x.toString(); // number
        })();
}
function foo4(x: number | string | boolean) {
    return typeof x === "string"
        ? x
        : ((a: number | boolean) => {
            var b = x; // new scope - number | boolean
            return typeof x === "boolean"
                ? x.toString() // boolean
                : x.toString(); // number
        })(x); // x here is narrowed to number | boolean
}
// Type guards do not affect nested function declarations
function foo5(x: number | string | boolean) {
    if (typeof x === "string") {
        var y = x; // string;
        function foo() {
            var z = x; // string
        }
    }
}
module m {
    var x: number | string | boolean;
    module m2 {
        var b = x; // new scope - number | boolean | string
        var y: string;
        if (typeof x === "string") {
            y = x // string;
        } else {
            y = typeof x === "boolean"
            ? x.toString() // boolean
            : x.toString(); // number
        }
    }
}
module m1 {
    var x: number | string | boolean;
    module m2.m3 {
        var b = x; // new scope - number | boolean | string
        var y: string;
        if (typeof x === "string") {
            y = x // string;
        } else {
            y = typeof x === "boolean"
            ? x.toString() // boolean
            : x.toString(); // number
        }
    }
}