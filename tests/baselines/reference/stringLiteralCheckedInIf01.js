//// [stringLiteralCheckedInIf01.ts]

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

    throw new Error("Unreachable code hit.");
}

//// [stringLiteralCheckedInIf01.js]
function f(foo) {
    if (foo === "a") {
        return foo;
    }
    else if (foo === "b") {
        return foo;
    }
    else {
        return foo[0];
    }
    throw new Error("Unreachable code hit.");
}
