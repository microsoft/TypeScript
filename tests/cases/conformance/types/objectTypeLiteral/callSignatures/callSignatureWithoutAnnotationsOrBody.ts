// Call signatures without a return type annotation and function body return 'any'

function foo(x) { }
var r = foo(1); // void since there's a body

interface I {
    ();
    f();
}
var i: I;
var r2 = i();
var r3 = i.f();

var a: {
    ();
    f();
};
var r4 = a();
var r5 = a.f();