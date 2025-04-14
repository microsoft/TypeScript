//// [tests/cases/conformance/types/intersection/intersectionAndUnionTypes.ts] ////

//// [intersectionAndUnionTypes.ts]
interface A { a: string }
interface B { b: string }
interface C { c: string }
interface D { d: string }

var a: A;
var b: B;
var c: C;
var d: D;
var anb: A & B;
var aob: A | B;
var cnd: C & D;
var cod: C | D;
var x: A & B | C & D;
var y: (A | B) & (C | D);

a = anb;  // Ok
b = anb;  // Ok
anb = a;
anb = b;

x = anb;  // Ok
x = aob;
x = cnd;  // Ok
x = cod;
anb = x;
aob = x;
cnd = x;
cod = x;

y = anb;
y = aob;
y = cnd;
y = cod;
anb = y;
aob = y;  // Ok
cnd = y;
cod = y;  // Ok


//// [intersectionAndUnionTypes.js]
var a;
var b;
var c;
var d;
var anb;
var aob;
var cnd;
var cod;
var x;
var y;
a = anb; // Ok
b = anb; // Ok
anb = a;
anb = b;
x = anb; // Ok
x = aob;
x = cnd; // Ok
x = cod;
anb = x;
aob = x;
cnd = x;
cod = x;
y = anb;
y = aob;
y = cnd;
y = cod;
anb = y;
aob = y; // Ok
cnd = y;
cod = y; // Ok
