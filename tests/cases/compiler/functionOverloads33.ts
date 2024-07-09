function foo(bar:string):string;
function foo(bar:any):number;
function foo(bar:any):any{ return bar }
var x = foo(5);
