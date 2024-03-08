//// [tests/cases/compiler/functionOverloads40.ts] ////

//// [functionOverloads40.ts]
function foo(bar:{a:number;}[]):string;
function foo(bar:{a:boolean;}[]):number;
function foo(bar:{a:any;}[]):any{ return bar }
var x = foo([{a:'bar'}]);


//// [functionOverloads40.js]
function foo(bar) { return bar; }
var x = foo([{ a: 'bar' }]);
