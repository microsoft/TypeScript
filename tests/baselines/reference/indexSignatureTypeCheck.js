//// [indexSignatureTypeCheck.ts]
interface IPropertySet {
    [index: string]: any;
}

var ps: IPropertySet = null;
var index: any = "hello";
ps[index] = 12;

enum Values {
    a = 1,
    b = 2
}

type Values2 = Values;
type Values3 = number;
 
interface EnumMap {
    [index: Values]: Values;
}

interface EnumMap2 {
    [index: Values2]: Values2;
}
interface NumberMap {
    [index: Values3]: Values3;
}

var pe: Values = null;

pe[1] = null
pe[3] = null
pe[Values.b] = 5

pe[true] = null

interface indexErrors {
    [p2?: string];
    [...p3: any[]];
    [p4: string, p5?: string];
    [p6: string, ...p7: any[]];
}

enum E {
    A, B, C
}

enum E2 {
    A, B, C
}

enum F {
    H, I, J
}

interface DuplicateAccess {
    [index: Values]: Values;
    [index: Values2]: Values2;
}

interface DuplicateAccess2 {
    [index: number]: Values;
    [index: Values3]: Values3;
}

var x: { [x: string]: string }
var xn: {[x: string]: number }
var y: { [x: number]: string }
var yn: { [x: number]: number }
var z: { [x: E]: number }

x = x;
x = y;
x = z;

y = x;
y = y;
y = z;

z = x; // error
z = y; // error
z = z;
z = yn; // should error?
        // var x: E = 5; // allowed to a assign a wider type (number) to an enum value (number.subset)
z = xn;

yn = z;

var e: E;
var e2: E2;s
var f: F;

e = f; // error
e2 = e;
e = e2;

type foo = string
var s: { [x: foo]: string }
x = s
s = x


//// [indexSignatureTypeCheck.js]
var ps = null;
var index = "hello";
ps[index] = 12;
var Values;
(function (Values) {
    Values[Values["a"] = 1] = "a";
    Values[Values["b"] = 2] = "b";
})(Values || (Values = {}));
var pe = null;
pe[1] = null;
pe[3] = null;
pe[Values.b] = 5;
pe[true] = null;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
var E2;
(function (E2) {
    E2[E2["A"] = 0] = "A";
    E2[E2["B"] = 1] = "B";
    E2[E2["C"] = 2] = "C";
})(E2 || (E2 = {}));
var F;
(function (F) {
    F[F["H"] = 0] = "H";
    F[F["I"] = 1] = "I";
    F[F["J"] = 2] = "J";
})(F || (F = {}));
var x;
var xn;
var y;
var yn;
var z;
x = x;
x = y;
x = z;
y = x;
y = y;
y = z;
z = x; // error
z = y; // error
z = z;
z = yn; // should error?
// var x: E = 5; // allowed to a assign a wider type (number) to an enum value (number.subset)
z = xn;
yn = z;
var e;
var e2;
s;
var f;
e = f; // error
e2 = e;
e = e2;
var s;
x = s;
s = x;
