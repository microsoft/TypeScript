//// [tests/cases/conformance/types/union/unionTypeCallSignatures3.ts] ////

//// [unionTypeCallSignatures3.ts]
function f1(s: string) { }
function f2(s?: string) { }
function f3(...s: string[]) { }
function f4(s: string, s2?: string) { }
function f5(s?: string, n?: number) { }
function f6(s?: string, ...n: number[]) { }
function f7(s: string, ...sRest: string[]) { }

var fUnion: typeof f1 | typeof f2 | typeof f3 | typeof f4 | typeof f5 | typeof f6 | typeof f7;

fUnion(""); // All constituents can be called by passing a single string.


//// [unionTypeCallSignatures3.js]
function f1(s) { }
function f2(s) { }
function f3() {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
}
function f4(s, s2) { }
function f5(s, n) { }
function f6(s) {
    var n = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        n[_i - 1] = arguments[_i];
    }
}
function f7(s) {
    var sRest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sRest[_i - 1] = arguments[_i];
    }
}
var fUnion;
fUnion(""); // All constituents can be called by passing a single string.
