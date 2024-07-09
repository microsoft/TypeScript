class C {
    foo;
}

interface I {
    foo;
}

var a: {
    foo;
}

var b = {
    foo: null
}

// These should all be of type 'any'
var r1 = (new C()).foo;
var r2 = (<I>null).foo;
var r3 = a.foo;
var r4 = b.foo;