//// [tests/cases/compiler/i3.ts] ////

//// [i3.ts]
interface I3 { one?: number; }; 
declare var x: {one: number};
declare var i: I3;

i = x;
x = i;

//// [i3.js]
;
i = x;
x = i;
