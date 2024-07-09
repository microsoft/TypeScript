function foo(foo:{a:string; b:number;}):string;
function foo(foo:{a:string; b:number;}):number;
function foo(foo:{a:string; b?:number;}):any { return "" }
