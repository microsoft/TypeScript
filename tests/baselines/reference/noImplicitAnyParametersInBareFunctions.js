//// [noImplicitAnyParametersInBareFunctions.ts]
// No implicit-'any' errors.
function f1(): void { }

// Implicit-'any' error for x.
function f2(x): void { }

// No implicit-'any' errors.
function f3(x: any): void { }

// Implicit-'any' errors for x, y, and z.
function f4(x, y, z): void { }

// Implicit-'any' errors for x, and z.
function f5(x, y: any, z): void { }

// Implicit-'any[]' error for r.
function f6(...r): void { }

// Implicit-'any'/'any[]' errors for x, r.
function f7(x, ...r): void { }

// Implicit-'any' errors for x1, y2, x3, and y3.
function f8(x1, y1: number): any;
function f8(x2: string, y2): any;
function f8(x3, y3): any { } 

// No implicit-'any' errors.
var f9 = () => "";

// Implicit-'any' errors for x.
var f10 = (x) => "";

// Implicit-'any' errors for x, y, and z.
var f11 = (x, y, z) => "";

// Implicit-'any' errors for x and z.
var f12 = (x, y: any, z) => "";

// Implicit-'any[]' error for r.
var f13 = (...r) => "";

// Implicit-'any'/'any[]' errors for x, r.
var f14 = (x, ...r) => "";

//// [noImplicitAnyParametersInBareFunctions.js]
// No implicit-'any' errors.
function f1() { }
// Implicit-'any' error for x.
function f2(x) { }
// No implicit-'any' errors.
function f3(x) { }
// Implicit-'any' errors for x, y, and z.
function f4(x, y, z) { }
// Implicit-'any' errors for x, and z.
function f5(x, y, z) { }
// Implicit-'any[]' error for r.
function f6() {
    var r = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        r[_i] = arguments[_i];
    }
}
// Implicit-'any'/'any[]' errors for x, r.
function f7(x) {
    var r = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        r[_i - 1] = arguments[_i];
    }
}
function f8(x3, y3) { }
// No implicit-'any' errors.
var f9 = function () { return ""; };
// Implicit-'any' errors for x.
var f10 = function (x) { return ""; };
// Implicit-'any' errors for x, y, and z.
var f11 = function (x, y, z) { return ""; };
// Implicit-'any' errors for x and z.
var f12 = function (x, y, z) { return ""; };
// Implicit-'any[]' error for r.
var f13 = function () {
    var r = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        r[_i] = arguments[_i];
    }
    return "";
};
// Implicit-'any'/'any[]' errors for x, r.
var f14 = function (x) {
    var r = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        r[_i - 1] = arguments[_i];
    }
    return "";
};
