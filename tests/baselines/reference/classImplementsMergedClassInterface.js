//// [tests/cases/conformance/classes/classDeclarations/classImplementsMergedClassInterface.ts] ////

//// [classImplementsMergedClassInterface.ts]
declare class C1 {
    x : number;
}

interface C1 {
    y : number;
}

class C2 implements C1 { // error -- missing x
}

class C3 implements C1 { // error -- missing y
    x : number;
}

class C4 implements C1 { // error -- missing x
    y : number;
}

class C5 implements C1 { // okay
    x : number;
    y : number;
}

//// [classImplementsMergedClassInterface.js]
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
var C4 = /** @class */ (function () {
    function C4() {
    }
    return C4;
}());
var C5 = /** @class */ (function () {
    function C5() {
    }
    return C5;
}());
