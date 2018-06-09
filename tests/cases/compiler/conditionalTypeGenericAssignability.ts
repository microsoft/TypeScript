// @strict: true
function f1<T extends { foo: unknown; 0: unknown }>(_a: T, b: Extract<keyof T, string>) {
    b = "foo"; // succeeds
    b = 0; // errors
}

function f2<T extends { foo: unknown; 0: unknown }>(_a: T, b: Exclude<keyof T, string>) {
    b = "foo"; // errors
    b = 0; // succeeds
}
