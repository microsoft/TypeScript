//// [tests/cases/compiler/overloadResolutionTest1.ts] ////

//// [overloadResolutionTest1.ts]
function foo(bar:{a:number;}[]):string;
function foo(bar:{a:boolean;}[]):number;
function foo(bar:{a:any;}[]):any{ return bar };

var x1 = foo([{a:true}]); // works
var x11 = foo([{a:0}]); // works
var x111 = foo([{a:"s"}]); // error - does not match any signature
var x1111 = foo([{a:null}]); // works - ambiguous call is resolved to be the first in the overload set so this returns a string



function foo2(bar:{a:number;}):string;
function foo2(bar:{a:boolean;}):number;
function foo2(bar:{a:any;}):any{ return bar };

var x2 = foo2({a:0}); // works
var x3 = foo2({a:true}); // works
var x4 = foo2({a:"s"}); // error


function foo4(bar:{a:number;}):number;
function foo4(bar:{a:string;}):string;
function foo4(bar:{a:any;}):any{ return bar };
var x = foo4({a:true}); // error

//// [overloadResolutionTest1.js]
function foo(bar) { return bar; }
;
var x1 = foo([{ a: true }]); // works
var x11 = foo([{ a: 0 }]); // works
var x111 = foo([{ a: "s" }]); // error - does not match any signature
var x1111 = foo([{ a: null }]); // works - ambiguous call is resolved to be the first in the overload set so this returns a string
function foo2(bar) { return bar; }
;
var x2 = foo2({ a: 0 }); // works
var x3 = foo2({ a: true }); // works
var x4 = foo2({ a: "s" }); // error
function foo4(bar) { return bar; }
;
var x = foo4({ a: true }); // error
