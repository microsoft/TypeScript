//// [tests/cases/compiler/functionCall6.ts] ////

//// [functionCall6.ts]
function foo(a:string){}; 
foo('bar');
foo(2);
foo('foo', 'bar');
foo();


//// [functionCall6.js]
function foo(a) { }
;
foo('bar');
foo(2);
foo('foo', 'bar');
foo();
