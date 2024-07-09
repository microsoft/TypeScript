//// [tests/cases/compiler/functionCall12.ts] ////

//// [functionCall12.ts]
function foo(a:string, b?:number, c?:string){}
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 'bar');
foo('foo', 1, 3);


//// [functionCall12.js]
function foo(a, b, c) { }
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 'bar');
foo('foo', 1, 3);
