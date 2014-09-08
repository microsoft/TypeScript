//// [functionCall16.ts]
function foo(a:string, b?:string, ...c:number[]){}
foo('foo', 1); 
foo('foo'); 
foo('foo', 'bar'); 
foo();
foo(1, 'bar');
foo('foo', 'bar', 3);


//// [functionCall16.js]
function foo(a, b) {
}
foo('foo', 1);
foo('foo');
foo('foo', 'bar');
foo();
foo(1, 'bar');
foo('foo', 'bar', 3);
