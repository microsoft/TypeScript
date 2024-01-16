
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
