//// [for-inStatementsDestructuring4.ts]
var a, b;
for ({a, b} in []) { }

//// [for-inStatementsDestructuring4.js]
var a, b;
for ({ a: a, b: b } in []) { }
