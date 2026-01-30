//// [tests/cases/compiler/functionCall17.ts] ////

//// [functionCall17.ts]
function foo(a:string, b?:string, c?:number, ...d:number[]){}
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 3);
foo('foo', 'bar', 3, 4);


//// [functionCall17.js]
function foo(a, b, c, ...d) { }
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 3);
foo('foo', 'bar', 3, 4);
