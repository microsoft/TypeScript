//// [functionCall11.ts]
function foo(a:string, b?:number){} 
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 'bar');


//// [functionCall11.js]
function foo(a, b) { }
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 'bar');
