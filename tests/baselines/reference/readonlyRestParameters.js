//// [readonlyRestParameters.ts]
function f0(a: string, b: string) {
    f0(a, b);
    f1(a, b);
    f2(a, b);
}

function f1(...args: readonly string[]) {
    f0(...args);  // Error
    f1('abc', 'def');
    f1('abc', ...args);
    f1(...args);
}

function f2(...args: readonly [string, string]) {
    f0(...args);
    f1('abc', 'def');
    f1('abc', ...args);
    f1(...args);
    f2('abc', 'def');
    f2('abc', ...args);  // Error
    f2(...args);
}

function f4(...args: readonly string[]) {
    args[0] = 'abc';  // Error
}


//// [readonlyRestParameters.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function f0(a, b) {
    f0(a, b);
    f1(a, b);
    f2(a, b);
}
function f1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    f0.apply(void 0, args); // Error
    f1('abc', 'def');
    f1.apply(void 0, __spreadArray(['abc'], args, false));
    f1.apply(void 0, args);
}
function f2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    f0.apply(void 0, args);
    f1('abc', 'def');
    f1.apply(void 0, __spreadArray(['abc'], args, false));
    f1.apply(void 0, args);
    f2('abc', 'def');
    f2.apply(void 0, __spreadArray(['abc'], args, false)); // Error
    f2.apply(void 0, args);
}
function f4() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args[0] = 'abc'; // Error
}


//// [readonlyRestParameters.d.ts]
declare function f0(a: string, b: string): void;
declare function f1(...args: readonly string[]): void;
declare function f2(...args: readonly [string, string]): void;
declare function f4(...args: readonly string[]): void;
