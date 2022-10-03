interface I3 { one?: number; }; 
var x: {one: number};
var i: I3;

i = x;
x = i;