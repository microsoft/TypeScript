//// [tests/cases/compiler/functionCall10.ts] ////

//// [functionCall10.ts]
function foo(...a:number[]){};
foo(0, 1); 
foo('foo'); 
foo();
foo(1, 'bar');


//// [functionCall10.js]
function foo(...a) { }
;
foo(0, 1);
foo('foo');
foo();
foo(1, 'bar');
