function foo(bar:{a:number;}):string;
function foo(bar:{a:boolean;}):number;
function foo(bar:{a:any;}):any{ return bar }
var x = foo();
