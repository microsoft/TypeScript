class C {
    foo: string;
}

var c: C;

interface I {
    fooo: string;
}

var i: I;

c = i; // error
i = c; // error