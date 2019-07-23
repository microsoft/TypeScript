//// [declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.ts]
// Note that both of the following have an `any` in their return type from where we bottom out the type printout
// for having too many instances of the same symbol nesting.

// Slightly simplified repro from https://github.com/microsoft/TypeScript/issues/30732 so it's easier to read and debug
export type Key<U> = keyof U;
export type Value<K extends Key<U>, U> = U[K];
export const updateIfChanged = <T>(t: T) => {
    const reduce = <U>(u: U, update: (u: U) => T) => {
        const set = (newU: U) => Object.is(u, newU) ? t : update(newU);
        return Object.assign(
            <K extends Key<U>>(key: K) =>
                reduce<Value<K, U>>(u[key as keyof U] as Value<K, U>, (v: Value<K, U>) => {
                    return update(Object.assign(Array.isArray(u) ? [] : {}, u, { [key]: v }));
                }),
            { map: (updater: (u: U) => U) => set(updater(u)), set });
    };
    return reduce<T>(t, (t: T) => t);
};

// example from https://github.com/microsoft/TypeScript/issues/31605

export const testRecFun = <T extends Object>(parent: T) => {
    return {
        result: parent,
        deeper: <U extends Object>(child: U) =>
            testRecFun<T & U>({ ...parent, ...child })
    };
}


let p1 = testRecFun({ one: '1' })
void p1.result.one;
let p2 = p1.deeper({ two: '2' })
void p2.result.one;
void p2.result.two;
let p3 = p2.deeper({ three: '3' })
void p3.result.one;
void p3.result.two;
void p3.result.three;


//// [declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.js]
"use strict";
// Note that both of the following have an `any` in their return type from where we bottom out the type printout
// for having too many instances of the same symbol nesting.
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
exports.__esModule = true;
exports.updateIfChanged = function (t) {
    var reduce = function (u, update) {
        var set = function (newU) { return Object.is(u, newU) ? t : update(newU); };
        return Object.assign(function (key) {
            return reduce(u[key], function (v) {
                var _a;
                return update(Object.assign(Array.isArray(u) ? [] : {}, u, (_a = {}, _a[key] = v, _a)));
            });
        }, { map: function (updater) { return set(updater(u)); }, set: set });
    };
    return reduce(t, function (t) { return t; });
};
// example from https://github.com/microsoft/TypeScript/issues/31605
exports.testRecFun = function (parent) {
    return {
        result: parent,
        deeper: function (child) {
            return exports.testRecFun(__assign(__assign({}, parent), child));
        }
    };
};
var p1 = exports.testRecFun({ one: '1' });
void p1.result.one;
var p2 = p1.deeper({ two: '2' });
void p2.result.one;
void p2.result.two;
var p3 = p2.deeper({ three: '3' });
void p3.result.one;
void p3.result.two;
void p3.result.three;


//// [declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts]
export declare type Key<U> = keyof U;
export declare type Value<K extends Key<U>, U> = U[K];
export declare const updateIfChanged: <T>(t: T) => (<K extends keyof T>(key: K) => (<K_1 extends keyof T[K]>(key: K_1) => (<K_2 extends keyof T[K][K_1]>(key: K_2) => (<K_3 extends keyof T[K][K_1][K_2]>(key: K_3) => (<K_4 extends keyof T[K][K_1][K_2][K_3]>(key: K_4) => (<K_5 extends keyof T[K][K_1][K_2][K_3][K_4]>(key: K_5) => (<K_6 extends keyof T[K][K_1][K_2][K_3][K_4][K_5]>(key: K_6) => (<K_7 extends keyof T[K][K_1][K_2][K_3][K_4][K_5][K_6]>(key: K_7) => (<K_8 extends keyof T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7]>(key: K_8) => (<K_9 extends keyof T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]>(key: K_9) => (<K_10 extends keyof T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]>(key: K_10) => any & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9][K_10]) => T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9][K_10]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9][K_10]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]) => T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]) => T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7]) => T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4][K_5][K_6]) => T[K][K_1][K_2][K_3][K_4][K_5][K_6]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4][K_5][K_6]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4][K_5]) => T[K][K_1][K_2][K_3][K_4][K_5]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4][K_5]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3][K_4]) => T[K][K_1][K_2][K_3][K_4]) => T;
    set: (newU: T[K][K_1][K_2][K_3][K_4]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2][K_3]) => T[K][K_1][K_2][K_3]) => T;
    set: (newU: T[K][K_1][K_2][K_3]) => T;
}) & {
    map: (updater: (u: T[K][K_1][K_2]) => T[K][K_1][K_2]) => T;
    set: (newU: T[K][K_1][K_2]) => T;
}) & {
    map: (updater: (u: T[K][K_1]) => T[K][K_1]) => T;
    set: (newU: T[K][K_1]) => T;
}) & {
    map: (updater: (u: T[K]) => T[K]) => T;
    set: (newU: T[K]) => T;
}) & {
    map: (updater: (u: T) => T) => T;
    set: (newU: T) => T;
};
export declare const testRecFun: <T extends Object>(parent: T) => {
    result: T;
    deeper: <U extends Object>(child: U) => {
        result: T & U;
        deeper: <U_1 extends Object>(child: U_1) => {
            result: T & U & U_1;
            deeper: <U_2 extends Object>(child: U_2) => {
                result: T & U & U_1 & U_2;
                deeper: <U_3 extends Object>(child: U_3) => {
                    result: T & U & U_1 & U_2 & U_3;
                    deeper: <U_4 extends Object>(child: U_4) => {
                        result: T & U & U_1 & U_2 & U_3 & U_4;
                        deeper: <U_5 extends Object>(child: U_5) => {
                            result: T & U & U_1 & U_2 & U_3 & U_4 & U_5;
                            deeper: <U_6 extends Object>(child: U_6) => {
                                result: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6;
                                deeper: <U_7 extends Object>(child: U_7) => {
                                    result: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7;
                                    deeper: <U_8 extends Object>(child: U_8) => {
                                        result: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8;
                                        deeper: <U_9 extends Object>(child: U_9) => {
                                            result: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U_9;
                                            deeper: <U_10 extends Object>(child: U_10) => any;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
