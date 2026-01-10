class C {
    foo: string;
}

declare var c: C;

interface I {
    fooo: string;
}

declare var i: I;

c = i; // error
i = c; // error