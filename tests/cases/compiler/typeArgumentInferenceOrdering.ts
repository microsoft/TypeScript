class C {
    y: I;
}

interface I {
    x(): Goo;
}

interface Goo {
    p: string;
}

function foo<T>(f: { y: T }): T { return null }
var x = foo(new C()).x; // was Error that property x does not exist on type {}