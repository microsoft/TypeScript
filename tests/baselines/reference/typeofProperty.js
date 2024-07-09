//// [tests/cases/compiler/typeofProperty.ts] ////

//// [typeofProperty.ts]
interface I1 {
    a: number;
    b: typeof a; // Should yield error (a is not a value)
}

interface I2 {
    c: typeof d; // Should yield error (d is not a value)
    d: string;
}

interface I3 {
    e: typeof e; // Should yield error (e is not a value)
}

class C1 {
    a: number;
    b: typeof a; // Should yield error (a is not a value)
}


class C2 {
    c: typeof d; // Should yield error (d is not a value)
    d: string;
}

class C3 {
    e: typeof e; // Should yield error (e is not a value)
}



interface ValidInterface {
    x: string;
}

class ValidClass implements ValidInterface {
    x: string;
}

var vcInstance = new ValidClass();
var viInstance = vcInstance;

var x1: typeof vcInstance.x; // x1: string
var x2: typeof viInstance.x; // x2: string




//// [typeofProperty.js]
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
var ValidClass = /** @class */ (function () {
    function ValidClass() {
    }
    return ValidClass;
}());
var vcInstance = new ValidClass();
var viInstance = vcInstance;
var x1; // x1: string
var x2; // x2: string
