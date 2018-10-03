//// [inferObjectTypeFromStringLiteralToKeyof.ts]
declare function inference1<T>(name: keyof T): T;
declare function inference2<T>(target: T, name: keyof T): T;
declare var two: "a" | "d";
const x = inference1(two);
const y = inference2({ a: 1, b: 2, c: 3, d(n) { return n } }, two);


//// [inferObjectTypeFromStringLiteralToKeyof.js]
var x = inference1(two);
var y = inference2({ a: 1, b: 2, c: 3, d: function (n) { return n; } }, two);
