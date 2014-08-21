//// [assignToModule.ts]
module A {}
A = undefined; // invalid LHS

//// [assignToModule.js]
A = undefined; // invalid LHS
