//// [spreadObjectOrFalsy.ts]
function f1<T>(a: T & undefined) {
    return { ...a };  // Error
}

function f2<T>(a: T | T & undefined) {
    return { ...a };
}

function f3<T extends undefined>(a: T) {
    return { ...a };  // Error
}

function f4<T extends undefined>(a: object | T) {
    return { ...a };
}

function f5<S, T extends undefined>(a: S | T) {
    return { ...a };
}

function f6<T extends object | undefined>(a: T) {
    return { ...a };
}

// Repro from #46976

function g1<T extends {}, A extends { z: (T | undefined) & T }>(a: A) {
    const { z } = a;
    return {
        ...z
    };
}


//// [spreadObjectOrFalsy.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function f1(a) {
    return __assign({}, a); // Error
}
function f2(a) {
    return __assign({}, a);
}
function f3(a) {
    return __assign({}, a); // Error
}
function f4(a) {
    return __assign({}, a);
}
function f5(a) {
    return __assign({}, a);
}
function f6(a) {
    return __assign({}, a);
}
// Repro from #46976
function g1(a) {
    var z = a.z;
    return __assign({}, z);
}


//// [spreadObjectOrFalsy.d.ts]
declare function f1<T>(a: T & undefined): any;
declare function f2<T>(a: T | T & undefined): T | (T & undefined);
declare function f3<T extends undefined>(a: T): any;
declare function f4<T extends undefined>(a: object | T): {};
declare function f5<S, T extends undefined>(a: S | T): S | T;
declare function f6<T extends object | undefined>(a: T): T;
declare function g1<T extends {}, A extends {
    z: (T | undefined) & T;
}>(a: A): (T | undefined) & T;
