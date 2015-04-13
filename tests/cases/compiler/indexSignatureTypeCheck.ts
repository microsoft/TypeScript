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
