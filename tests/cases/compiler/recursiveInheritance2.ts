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
