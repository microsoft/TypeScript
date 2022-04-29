//// [tests/cases/compiler/inlineSources.ts] ////

//// [a.ts]
var a = 0;
console.log(a);

//// [b.ts]
var b = 0;
console.log(b);

//// [out.js]
var a = 0;
console.log(a);
var b = 0;
console.log(b);
//# sourceMappingURL=out.js.map