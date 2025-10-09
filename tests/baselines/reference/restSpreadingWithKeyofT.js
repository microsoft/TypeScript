//// [tests/cases/compiler/restSpreadingWithKeyofT.ts] ////

//// [restSpreadingWithKeyofT.ts]
// Test case 1: Using keyof T directly in rest spreading
// Should result in Partial<T> instead of Omit<T, keyof T>
function f1<T>(obj: T, key: keyof T) {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 2: Union of keyof T
// Should result in Partial<T> since both k1 and k2 are keyof T
function f2<T>(obj: T, k1: keyof T, k2: keyof T) {
    const { [k1]: removed1, [k2]: removed2, ...rest } = obj;
    return rest;
}

// Test case 3: keyof T with additional literal
// Should still use Partial<T> since the union contains keyof T
function f3<T>(obj: T, key: keyof T | "extra") {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 4: Specific type with keyof
type MyObj = { a: string; b: number; c: boolean; };
function f4(obj: MyObj, key: keyof MyObj) {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 5: Constraint with keyof
function f5<T extends { a: string; b: number }>(obj: T, key: keyof T) {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 6: Multiple parameters with keyof in object literal
function f6<T>(obj: T, k1: keyof T, k2: keyof T, k3: keyof T) {
    const { [k1]: r1, [k2]: r2, [k3]: r3, ...rest } = obj;
    return rest;
}

// Test case 7: Nested rest with keyof
function f7<T>(obj: T, key: keyof T) {
    const { [key]: val, ...rest } = obj;
    const consumed = val;
    return { consumed, rest };
}

// Test case 8: Array of keyof (not applicable but shows edge case)
function f8<T>(obj: T, keys: Array<keyof T>) {
    // Can't destructure with array, but showing the type relationship
    const key = keys[0];
    const { [key]: removed, ...rest } = obj;
    return rest;
}


//// [restSpreadingWithKeyofT.js]
"use strict";
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
// Test case 1: Using keyof T directly in rest spreading
// Should result in Partial<T> instead of Omit<T, keyof T>
function f1(obj, key) {
    var _a = obj, _b = key, removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
}
// Test case 2: Union of keyof T
// Should result in Partial<T> since both k1 and k2 are keyof T
function f2(obj, k1, k2) {
    var _a = obj, _b = k1, removed1 = _a[_b], _c = k2, removed2 = _a[_c], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", typeof _c === "symbol" ? _c : _c + ""]);
    return rest;
}
// Test case 3: keyof T with additional literal
// Should still use Partial<T> since the union contains keyof T
function f3(obj, key) {
    var _a = obj, _b = key, removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
}
function f4(obj, key) {
    var _a = obj, _b = key, removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
}
// Test case 5: Constraint with keyof
function f5(obj, key) {
    var _a = obj, _b = key, removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
}
// Test case 6: Multiple parameters with keyof in object literal
function f6(obj, k1, k2, k3) {
    var _a = obj, _b = k1, r1 = _a[_b], _c = k2, r2 = _a[_c], _d = k3, r3 = _a[_d], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", typeof _c === "symbol" ? _c : _c + "", typeof _d === "symbol" ? _d : _d + ""]);
    return rest;
}
// Test case 7: Nested rest with keyof
function f7(obj, key) {
    var _a = obj, _b = key, val = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    var consumed = val;
    return { consumed: consumed, rest: rest };
}
// Test case 8: Array of keyof (not applicable but shows edge case)
function f8(obj, keys) {
    // Can't destructure with array, but showing the type relationship
    var key = keys[0];
    var _a = obj, _b = key, removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
}


//// [restSpreadingWithKeyofT.d.ts]
declare function f1<T>(obj: T, key: keyof T): Partial<T>;
declare function f2<T>(obj: T, k1: keyof T, k2: keyof T): Partial<T>;
declare function f3<T>(obj: T, key: keyof T | "extra"): Partial<T>;
type MyObj = {
    a: string;
    b: number;
    c: boolean;
};
declare function f4(obj: MyObj, key: keyof MyObj): {};
declare function f5<T extends {
    a: string;
    b: number;
}>(obj: T, key: keyof T): Partial<T>;
declare function f6<T>(obj: T, k1: keyof T, k2: keyof T, k3: keyof T): Partial<T>;
declare function f7<T>(obj: T, key: keyof T): {
    consumed: T[keyof T];
    rest: Partial<T>;
};
declare function f8<T>(obj: T, keys: Array<keyof T>): Partial<T>;
