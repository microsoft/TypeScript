//// [tests/cases/compiler/functionOverloads36.ts] ////

//// [functionOverloads36.ts]
function foo(bar:{a:number;}):number;
function foo(bar:{a:string;}):string;
function foo(bar:{a:any;}):any{ return bar }
var x = foo({a:'foo'});


//// [functionOverloads36.js]
function foo(bar) { return bar; }
var x = foo({ a: 'foo' });
