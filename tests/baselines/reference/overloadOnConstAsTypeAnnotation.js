//// [overloadOnConstAsTypeAnnotation.ts]
var f: (x: 'hi') => number = (x: 'hi') => { return 1; };

//// [overloadOnConstAsTypeAnnotation.js]
var f = function f(x) { return 1; };
