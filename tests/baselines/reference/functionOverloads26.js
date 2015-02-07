//// [functionOverloads26.ts]
function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' }
var x = foo('baz');


//// [functionOverloads26.js]
function foo(bar) { return ''; }
var x = foo('baz');
