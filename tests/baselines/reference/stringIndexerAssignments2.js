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
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var x;
var a;
var b;
x = a;
x = b;
