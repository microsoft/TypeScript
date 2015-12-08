
type S = "a" | "b";
type T = S[] | S;

function isS(t: T): t is S {
    return t === "a" || t === "b";
}

function f(foo: T) {
    if (isS(foo)) {
        return foo;
    }
    else { 
        return foo[0];
    }
}