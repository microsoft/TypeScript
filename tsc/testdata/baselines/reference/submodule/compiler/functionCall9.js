//// [tests/cases/compiler/functionCall9.ts] ////

//// [functionCall9.ts]
function foo(a?:string, b?:number){};
foo('foo', 1); 
foo('foo'); 
foo('foo','bar');
foo('foo', 1, 'bar');
foo();

//// [functionCall9.js]
function foo(a, b) { }
;
foo('foo', 1);
foo('foo');
foo('foo', 'bar');
foo('foo', 1, 'bar');
foo();
