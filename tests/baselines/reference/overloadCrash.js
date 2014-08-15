//// [overloadCrash.ts]
interface I1 {a:number; b:number;};
interface I2 {c:number; d:number;};
interface I3 {a:number; b:number; c:number; d:number;};

declare function foo(...n:I1[]);
declare function foo(n1:I2, n3:I2);

var i3:I3;

foo(i3, i3); // should not crash the compiler :)


//// [overloadCrash.js]
;
;
;
var i3;
foo(i3, i3); // should not crash the compiler :)
