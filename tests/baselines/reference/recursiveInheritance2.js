//// [tests/cases/compiler/recursiveInheritance2.ts] ////

//// [recursiveInheritance2.ts]
interface A { (): B; };
declare var a: A;
var x = a();

interface B { (): C; };
declare var b: B;
var y = b();

interface C { (): A; };
declare var c: C;
var z = c();

x = y;


//// [recursiveInheritance2.js]
;
var x = a();
;
var y = b();
;
var z = c();
x = y;
