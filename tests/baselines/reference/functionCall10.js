//// [functionCall10.ts]
function foo(...a:number[]){};
foo(0, 1); 
foo('foo'); 
foo();
foo(1, 'bar');


//// [functionCall10.js]
function foo() { }
;
foo(0, 1);
foo('foo');
foo();
foo(1, 'bar');
