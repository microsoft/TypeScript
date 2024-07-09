
type S = "a" | "b";
type T = S[] | S;

function f(foo: T) {
    if (foo === "a") {
        return foo;
    }
    else if (foo === "b") {
        return foo;
    }
    else { 
        return (foo as S[])[0];
    }
}