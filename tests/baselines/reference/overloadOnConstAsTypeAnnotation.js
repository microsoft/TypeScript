//// [tests/cases/compiler/overloadOnConstAsTypeAnnotation.ts] ////

//// [overloadOnConstAsTypeAnnotation.ts]
var f: (x: 'hi') => number = (x: 'hi') => { return 1; };

//// [overloadOnConstAsTypeAnnotation.js]
var f = (x) => { return 1; };
