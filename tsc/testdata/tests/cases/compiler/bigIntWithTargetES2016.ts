// @target: es2016
// @lib: esnext

BigInt(1) ** BigInt(1); // should not error

let num = BigInt(2);
num **= BigInt(2); // should not error
