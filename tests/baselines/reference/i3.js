//// [i3.ts]
interface I3 { one?: number; }; 
var x: {one: number};
var i: I3;

i = x;
x = i;

//// [i3.js]
;
var x;
var i;
i = x;
x = i;
