//// [assignmentCompatWithCallSignaturesWithRestParameters.ts]
// call signatures in derived types must have the same or fewer optional parameters as the target for assignment

interface Base { 
    a: (...args: number[]) => number;
    a2: (x: number, ...z: number[]) => number;
    a3: (x: number, y?: string, ...z: number[]) => number;
    a4: (x?: number, y?: string, ...z: number[]) => number;
}

var a: (...args: number[]) => number; // ok, same number of required params
    a = () => 1; // ok, same number of required params
    a = (...args: number[]) => 1; // ok, same number of required params
    a = (...args: string[]) => 1; // error, type mismatch
    a = (x?: number) => 1; // ok, same number of required params
    a = (x?: number, y?: number, z?: number) => 1; // ok, same number of required params
    a = (x: number) => 1; // ok, rest param corresponds to infinite number of params
    a = (x?: string) => 1; // error, incompatible type


var a2: (x: number, ...z: number[]) => number;
    a2 = () => 1; // ok, fewer required params
    a2 = (...args: number[]) => 1; // ok, fewer required params
    a2 = (x?: number) => 1; // ok, fewer required params
    a2 = (x: number) => 1; // ok, same number of required params
    a2 = (x: number, ...args: number[]) => 1; // ok, same number of required params
    a2 = (x: number, ...args: string[]) => 1; // should be type mismatch error
    a2 = (x: number, y: number) => 1; // ok, rest param corresponds to infinite number of params
    a2 = (x: number, y?: number) => 1; // ok, same number of required params

var a3: (x: number, y?: string, ...z: number[]) => number;
    a3 = () => 1; // ok, fewer required params
    a3 = (x?: number) => 1; // ok, fewer required params
    a3 = (x: number) => 1; // ok, same number of required params
    a3 = (x: number, y: string) => 1;  // ok, all present params match
    a3 = (x: number, y?: number, z?: number) => 1;  // error
    a3 = (x: number, ...z: number[]) => 1;  // error
    a3 = (x: string, y?: string, z?: string) => 1;  // error

var a4: (x?: number, y?: string, ...z: number[]) => number;
    a4 = () => 1; // ok, fewer required params
    a4 = (x?: number, y?: number) => 1; // error, type mismatch
    a4 = (x: number) => 1; // ok, all present params match
    a4 = (x: number, y?: number) => 1;  // error, second param has type mismatch
    a4 = (x?: number, y?: string) => 1;  // ok, same number of required params with matching types
    a4 = (x: number, ...args: string[]) => 1;  // error, rest params have type mismatch

//// [assignmentCompatWithCallSignaturesWithRestParameters.js]
// call signatures in derived types must have the same or fewer optional parameters as the target for assignment
var a; // ok, same number of required params
a = function () { return 1; }; // ok, same number of required params
a = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return 1;
}; // ok, same number of required params
a = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return 1;
}; // error, type mismatch
a = function (x) { return 1; }; // ok, same number of required params
a = function (x, y, z) { return 1; }; // ok, same number of required params
a = function (x) { return 1; }; // ok, rest param corresponds to infinite number of params
a = function (x) { return 1; }; // error, incompatible type
var a2;
a2 = function () { return 1; }; // ok, fewer required params
a2 = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return 1;
}; // ok, fewer required params
a2 = function (x) { return 1; }; // ok, fewer required params
a2 = function (x) { return 1; }; // ok, same number of required params
a2 = function (x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return 1;
}; // ok, same number of required params
a2 = function (x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return 1;
}; // should be type mismatch error
a2 = function (x, y) { return 1; }; // ok, rest param corresponds to infinite number of params
a2 = function (x, y) { return 1; }; // ok, same number of required params
var a3;
a3 = function () { return 1; }; // ok, fewer required params
a3 = function (x) { return 1; }; // ok, fewer required params
a3 = function (x) { return 1; }; // ok, same number of required params
a3 = function (x, y) { return 1; }; // ok, all present params match
a3 = function (x, y, z) { return 1; }; // error
a3 = function (x) {
    var z = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        z[_i - 1] = arguments[_i];
    }
    return 1;
}; // error
a3 = function (x, y, z) { return 1; }; // error
var a4;
a4 = function () { return 1; }; // ok, fewer required params
a4 = function (x, y) { return 1; }; // error, type mismatch
a4 = function (x) { return 1; }; // ok, all present params match
a4 = function (x, y) { return 1; }; // error, second param has type mismatch
a4 = function (x, y) { return 1; }; // ok, same number of required params with matching types
a4 = function (x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return 1;
}; // error, rest params have type mismatch
