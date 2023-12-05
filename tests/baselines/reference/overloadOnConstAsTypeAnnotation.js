//// [tests/cases/compiler/overloadOnConstAsTypeAnnotation.ts] ////

//// [overloadOnConstAsTypeAnnotation.ts]
var f: (x: 'hi') => number = (x: 'hi') => { return 1; };

//// [overloadOnConstAsTypeAnnotation.js]
var f = function (x) { return 1; };
