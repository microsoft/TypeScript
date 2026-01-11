interface I3 { one?: number; }; 
declare var x: {one: number};
declare var i: I3;

i = x;
x = i;