//// [tests/cases/compiler/restSpreadingWithOmit.ts] ////

//// [restSpreadingWithOmit.ts]
// This file demonstrates cases where Omit is still used (not Partial)
// These are contrast cases to restSpreadingWithKeyofT.ts

// Test case 1: Specific literal key (not keyof T)
function f1<T extends { a: string; b: number; c: boolean }>(obj: T) {
    const { a, ...rest } = obj;
    return rest; // Should be Omit<T, "a">
}

// Test case 2: Multiple specific literal keys
function f2<T extends { a: string; b: number; c: boolean }>(obj: T) {
    const { a, b, ...rest } = obj;
    return rest; // Should be Omit<T, "a" | "b">
}

// Test case 3: K extends string (broader than keyof T)
function f3<T, K extends string>(obj: T, key: K) {
    // This will error because K is not guaranteed to be keyof T
    // but shows the type relationship
}

// Test case 4: Mixing literal and keyof T extends
function f4<T, K extends keyof T>(obj: T, key: K) {
    const { [key]: removed, ...rest } = obj;
    return rest; // Should be Omit<T, K>, not Partial<T> because K is a specific subset of keyof T
}

// Test case 5: Using specific keys from constrained type
type Props = { x: number; y: number; z: number };
function f5<T extends Props>(obj: T) {
    const { x, y, ...rest } = obj;
    return rest; // Should be Omit<T, "x" | "y">
}

// Test case 6: Symbol keys
const sym1 = Symbol();
const sym2 = Symbol();
function f6<T extends { [sym1]: string; [sym2]: number }>(obj: T) {
    const { [sym1]: s1, ...rest } = obj;
    return rest; // Should be Omit<T, typeof sym1>
}


//// [restSpreadingWithOmit.js]
"use strict";
// This file demonstrates cases where Omit is still used (not Partial)
// These are contrast cases to restSpreadingWithKeyofT.ts
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// Test case 1: Specific literal key (not keyof T)
function f1(obj) {
    var a = obj.a, rest = __rest(obj, ["a"]);
    return rest; // Should be Omit<T, "a">
}
// Test case 2: Multiple specific literal keys
function f2(obj) {
    var a = obj.a, b = obj.b, rest = __rest(obj, ["a", "b"]);
    return rest; // Should be Omit<T, "a" | "b">
}
// Test case 3: K extends string (broader than keyof T)
function f3(obj, key) {
    // This will error because K is not guaranteed to be keyof T
    // but shows the type relationship
}
// Test case 4: Mixing literal and keyof T extends
function f4(obj, key) {
    var _a = obj, _b = key, removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest; // Should be Omit<T, K>, not Partial<T> because K is a specific subset of keyof T
}
function f5(obj) {
    var x = obj.x, y = obj.y, rest = __rest(obj, ["x", "y"]);
    return rest; // Should be Omit<T, "x" | "y">
}
// Test case 6: Symbol keys
var sym1 = Symbol();
var sym2 = Symbol();
function f6(obj) {
    var _a = obj, _b = sym1, s1 = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest; // Should be Omit<T, typeof sym1>
}


//// [restSpreadingWithOmit.d.ts]
declare function f1<T extends {
    a: string;
    b: number;
    c: boolean;
}>(obj: T): Omit<T, "a">;
declare function f2<T extends {
    a: string;
    b: number;
    c: boolean;
}>(obj: T): Omit<T, "a" | "b">;
declare function f3<T, K extends string>(obj: T, key: K): void;
declare function f4<T, K extends keyof T>(obj: T, key: K): Omit<T, K>;
type Props = {
    x: number;
    y: number;
    z: number;
};
declare function f5<T extends Props>(obj: T): Omit<T, "x" | "y">;
declare const sym1: unique symbol;
declare const sym2: unique symbol;
declare function f6<T extends {
    [sym1]: string;
    [sym2]: number;
}>(obj: T): Omit<T, typeof sym1>;
