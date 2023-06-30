//// [tests/cases/compiler/functionOverloads39.ts] ////

//// [functionOverloads39.ts]
function foo(bar:{a:number;}[]):string;
function foo(bar:{a:boolean;}[]):number;
function foo(bar:{a:any;}[]):any{ return bar }
var x = foo([{a:true}]);


//// [functionOverloads39.js]
function foo(bar) { return bar; }
var x = foo([{ a: true }]);
