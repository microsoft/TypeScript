module m1 { export class c1 { public a; }}
function foo(a:m1.c1){ a.a = 1; }; 
var myC = new m1.c1(); 
foo(myC); 
foo(myC, myC); 
foo(4);
foo();
