//// [parseTypes.ts]
var x = <() => number>null;
var y = <{(): number; }>null;
var z = <{new(): number; }>null
var w = <{[x:number]: number; }>null
function f() { return 3 };
function g(s: string) { true };
y=f;
y=g;
x=g;
w=g;
z=g;


//// [parseTypes.js]
var x = null;
var y = null;
var z = null;
var w = null;
function f() { return 3; }
;
function g(s) { true; }
;
y = f;
y = g;
x = g;
w = g;
z = g;
