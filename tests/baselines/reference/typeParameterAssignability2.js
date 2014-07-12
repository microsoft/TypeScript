//// [typeParameterAssignability2.js]
// type parameters are not assignable to one another unless directly or indirectly constrained to one another
function foo(t, u) {
    t = u; // error
    u = t; // ok
}

function foo2(t, u) {
    t = u; // error
    u = t; // ok
}

function foo3(t, u, v) {
    t = u; // error
    u = t;

    t = v; // error
    v = t; // ok

    u = v; // error
    v = u; // ok
}

function foo4(t, u, v) {
    t = u; // error
    t = v; // error
    t = new Date(); // error

    u = t;
    u = v; // error
    u = new Date(); // error

    v = t;
    v = u;
    v = new Date(); // ok

    var d;
    d = t; // ok
    d = u; // ok
    d = v; // ok
}

// same as foo4 with different type parameter ordering
function foo5(t, u, v) {
    t = u; // error
    t = v; // error
    t = new Date(); // error

    u = t;
    u = v; // error
    u = new Date(); // error

    v = t;
    v = u;
    v = new Date(); // ok

    var d;
    d = t; // ok
    d = u; // ok
    d = v; // ok
}

function foo6(t, u, v) {
    t = u; // error
    t = v; // error

    u = t; // ok
    u = v; // error

    v = t; // error
    v = u; // error
}
