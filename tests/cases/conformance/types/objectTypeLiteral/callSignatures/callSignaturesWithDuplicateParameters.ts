// Duplicate parameter names are always an error

function foo(x, x) { }
var f = function foo(x, x) { }
var f2 = function (x, x) { }
var f3 = (x, x) => { }
var f4 = <T>(x: T, x: T) => { }

function foo2(x: string, x: number) { }
var f5 = function foo(x: string, x: number) { }
var f6 = function (x: string, x: number) { }
var f7 = (x: string, x: number) => { }
var f8 = <T>(x: T, y: T) => { }

class C {
    foo(x, x) { }
    foo2(x: number, x: string) { }
    foo3<T>(x: T, x: T) { }
}

interface I {
    (x, x);
    (x: string, x: number);
    foo(x, x);
    foo(x: number, x: string);
    foo3<T>(x: T, x: T);
}

var a: {
    foo(x, x);
    foo2(x: number, x: string);
};

var b = {
    foo(x, x) { },
    a: function foo(x: number, x: string) { },
    b: <T>(x: T, x: T) => { }
}