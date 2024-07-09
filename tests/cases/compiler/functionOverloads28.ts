function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' }
var t:any; var x = foo(t);
