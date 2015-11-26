// doc 6
// If struct array members are assigned with values of incompatible type, type error will be issued.

class A {}
var a: A;
var b = 1;

struct C { }
var c = new C();
struct D extends C {}
var d = new D();

struct E {}
var e: E;

var structArr: C[];
structArr = new C[5];

structArr[0] = a; // error
structArr[1] = b; // error
structArr[2] = c; // ok
structArr[3] = d; // ok
structArr[4] = e; // error