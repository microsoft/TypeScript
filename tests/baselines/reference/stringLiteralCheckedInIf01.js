//// [tests/cases/conformance/types/stringLiteral/stringLiteralCheckedInIf01.ts] ////

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
}
