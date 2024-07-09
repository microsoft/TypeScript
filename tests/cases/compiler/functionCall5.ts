module m1 { export class c1 { public a; }} 
function foo():m1.c1{return new m1.c1();}; 
var x = foo();