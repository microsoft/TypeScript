//// [functionOverloads14.ts]
function foo():{a:number;}
function foo():{a:string;}
function foo():{a:any;} { return {a:1} }


//// [functionOverloads14.js]
function foo() { return { a: 1 }; }
