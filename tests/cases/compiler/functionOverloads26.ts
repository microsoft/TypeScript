function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' }
var x = foo('baz');
