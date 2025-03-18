//// [tests/cases/compiler/stringIndexerAssignments2.ts] ////

//// [stringIndexerAssignments2.ts]
class C1 {
    [index: string]: string
    one: string;
}

class C2 {
    one: string;
}

class C3 {
    one: number;
    two: string;
}

var x: C1;
var a: C2;
var b: C3;

x = a;
x = b;

//// [stringIndexerAssignments2.js]
class C1 {
    one;
}
class C2 {
    one;
}
class C3 {
    one;
    two;
}
var x;
var a;
var b;
x = a;
x = b;
