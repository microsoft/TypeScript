//// [functionOverloads28.ts]
function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' }
var t:any; var x = foo(t);


//// [functionOverloads28.js]
function foo(bar) { return ''; }
var t;
var x = foo(t);
