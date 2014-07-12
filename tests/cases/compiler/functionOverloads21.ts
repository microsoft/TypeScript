function foo(bar:{a:number;}[]);
function foo(bar:{a:number; b:string;}[]);
function foo(bar:{a:any; b?:string;}[]) { return 0 }
