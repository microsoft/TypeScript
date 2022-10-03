//// [functionCall8.ts]
function foo(a?:string){}
foo('foo'); 
foo('foo', 'bar'); 
foo(4);
foo();


//// [functionCall8.js]
function foo(a) { }
foo('foo');
foo('foo', 'bar');
foo(4);
foo();
