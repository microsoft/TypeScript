//// [functionOverloads9.ts]
function foo(foo:string);
function foo(foo?:string){ return '' };
var x = foo('foo');


//// [functionOverloads9.js]
function foo(foo) { return ''; }
;
var x = foo('foo');
