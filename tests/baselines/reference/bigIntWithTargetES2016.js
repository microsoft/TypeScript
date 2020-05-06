//// [bigIntWithTargetES2016.ts]
BigInt(1) ** BigInt(1); // should not error

let num = BigInt(2);
num **= BigInt(2); // should not error


//// [bigIntWithTargetES2016.js]
BigInt(1) ** BigInt(1); // should not error
let num = BigInt(2);
num **= BigInt(2); // should not error
