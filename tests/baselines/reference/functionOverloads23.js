//// [functionOverloads23.ts]
function foo(bar:(b:string)=>void);
function foo(bar:(a:number)=>void);
function foo(bar:(a?)=>void) { return 0 }


//// [functionOverloads23.js]
function foo(bar) { return 0; }
