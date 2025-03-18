//// [tests/cases/compiler/functionCall14.ts] ////

//// [functionCall14.ts]
function foo(a?:string, ...b:number[]){} 
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 3);


//// [functionCall14.js]
function foo(a, ...b) { }
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 3);
