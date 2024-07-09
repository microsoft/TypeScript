// Optional parameters allow initializers only in implementation signatures
// All the below declarations are errors

function foo(x = 2);
function foo(x = 1) { }

foo(1);
foo();

class C {
    foo(x = 2);
    foo(x = 1) { }
}

var c: C;
c.foo();
c.foo(1);

var b = {
    foo(x = 1), // error
    foo(x = 1) { }, // error
}

b.foo();
b.foo(1);