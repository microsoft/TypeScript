function foo(bar:(b:string)=>void);
function foo(bar:(a:number)=>void);
function foo(bar:(a?)=>void) { return 0 }
