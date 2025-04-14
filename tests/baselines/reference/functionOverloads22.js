//// [tests/cases/compiler/functionOverloads22.ts] ////

//// [functionOverloads22.ts]
function foo(bar:number):{a:number;}[];
function foo(bar:string):{a:number; b:string;}[];
function foo(bar:any):{a:any;b?:any;}[] { return [{a:""}] }


//// [functionOverloads22.js]
function foo(bar) { return [{ a: "" }]; }
