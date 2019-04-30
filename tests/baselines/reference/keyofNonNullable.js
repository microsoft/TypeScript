//// [keyofNonNullable.ts]
function f<X, Y extends X>(keyofX: keyof X, keyofY: keyof Y) {
    keyofY = keyofX;
    keyofX = keyofY;
}


function f1<T>(keyofT: keyof T, keyofNonNullT: keyof NonNullable<T>) {
    keyofT = keyofNonNullT
}


//// [keyofNonNullable.js]
function f(keyofX, keyofY) {
    keyofY = keyofX;
    keyofX = keyofY;
}
function f1(keyofT, keyofNonNullT) {
    keyofT = keyofNonNullT;
}
