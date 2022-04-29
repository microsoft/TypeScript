//// [invalidConstraint1.ts]
function f<T, U extends { a: T }>() {
    return undefined;
}
f<string, { a: number }>(); // should error



//// [invalidConstraint1.js]
function f() {
    return undefined;
}
f(); // should error
