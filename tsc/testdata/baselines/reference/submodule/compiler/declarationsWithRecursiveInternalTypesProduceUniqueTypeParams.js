//// [tests/cases/compiler/declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRecFun = exports.updateIfChanged = void 0;
const updateIfChanged = (t) => {
    const reduce = (u, update) => {
        const set = (newU) => Object.is(u, newU) ? t : update(newU);
        return Object.assign((key) => reduce(u[key], (v) => {
            return update(Object.assign(Array.isArray(u) ? [] : {}, u, { [key]: v }));
        }), { map: (updater) => set(updater(u)), set });
    };
    return reduce(t, (t) => t);
};
exports.updateIfChanged = updateIfChanged;
// example from https://github.com/microsoft/TypeScript/issues/31605
const testRecFun = (parent) => {
    return {
        result: parent,
        deeper: (child) => (0, exports.testRecFun)(__assign(__assign({}, parent), child))
    };
};
exports.testRecFun = testRecFun;
let p1 = (0, exports.testRecFun)({ one: '1' });
void p1.result.one;
let p2 = p1.deeper({ two: '2' });
void p2.result.one;
void p2.result.two;
let p3 = p2.deeper({ three: '3' });
void p3.result.one;
void p3.result.two;
void p3.result.three;


//// [declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts]
// Note that both of the following have an `any` in their return type from where we bottom out the type printout
// for having too many instances of the same symbol nesting.
// Slightly simplified repro from https://github.com/microsoft/TypeScript/issues/30732 so it's easier to read and debug
export type Key<U> = keyof U;
export type Value<K extends Key<U>, U> = U[K];
export declare const updateIfChanged: <T>(t: T) => (<K extends keyof T>(key: K) => (<K extends keyof Value<K_1, T>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, T>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, T>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>(key: K) => /*elided*/ any & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, T>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, T>>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, T>>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, Value<K_2, T>>>) => Value<K, Value<K_1, Value<K_2, T>>>) => T;
    set: (newU: Value<K, Value<K_1, Value<K_2, T>>>) => T;
}) & {
    map: (updater: (u: Value<K, Value<K_1, T>>) => Value<K, Value<K_1, T>>) => T;
    set: (newU: Value<K, Value<K_1, T>>) => T;
}) & {
    map: (updater: (u: Value<K, T>) => Value<K, T>) => T;
    set: (newU: Value<K, T>) => T;
}) & {
    map: (updater: (u: T) => T) => T;
    set: (newU: T) => T;
};
// example from https://github.com/microsoft/TypeScript/issues/31605
export declare const testRecFun: <T extends Object>(parent: T) => {
    result: T;
    deeper: <U extends Object>(child: U) => {
        result: T & U;
        deeper: <U extends Object>(child: U) => {
            result: T & U_1 & U;
            deeper: <U extends Object>(child: U) => {
                result: T & U_1 & U_2 & U;
                deeper: <U extends Object>(child: U) => {
                    result: T & U_1 & U_2 & U_3 & U;
                    deeper: <U extends Object>(child: U) => {
                        result: T & U_1 & U_2 & U_3 & U_4 & U;
                        deeper: <U extends Object>(child: U) => {
                            result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U;
                            deeper: <U extends Object>(child: U) => {
                                result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U;
                                deeper: <U extends Object>(child: U) => {
                                    result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U;
                                    deeper: <U extends Object>(child: U) => {
                                        result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U;
                                        deeper: <U extends Object>(child: U) => {
                                            result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U_9 & U;
                                            deeper: <U extends Object>(child: U) => /*elided*/ any;
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


//// [DtsFileErrors]


declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,108): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,152): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,163): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,208): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,219): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,230): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,276): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,287): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,298): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,309): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,356): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,367): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,378): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,389): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,400): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,448): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,459): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,470): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,481): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,492): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,503): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,552): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,563): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,574): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,585): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,596): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,607): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,618): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,668): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,679): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,690): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,701): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,712): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,723): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,734): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,745): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,796): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,807): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,818): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,829): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,840): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,851): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,862): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,873): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,884): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,936): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,947): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,958): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,969): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,980): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,991): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,1002): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,1013): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,1024): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(6,1035): error TS2304: Cannot find name 'K_10'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,83): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,94): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,105): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,116): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,127): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,138): error TS2304: Cannot find name 'K_10'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,176): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,187): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,198): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,209): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,220): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,231): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,242): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,253): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,264): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(7,275): error TS2304: Cannot find name 'K_10'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,76): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,87): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,98): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,109): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,120): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(8,131): error TS2304: Cannot find name 'K_10'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,83): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,94): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,105): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,116): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,127): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,163): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,174): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,185): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,196): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,207): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,218): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,229): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,240): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(10,251): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,76): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,87): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,98): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,109): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(11,120): error TS2304: Cannot find name 'K_9'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,83): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,94): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,105): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,116): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,151): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,162): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,173): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,184): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,195): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,206): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,217): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(13,228): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,76): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,87): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,98): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(14,109): error TS2304: Cannot find name 'K_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,83): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,94): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,105): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,139): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,150): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,161): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,172): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,183): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,194): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(16,205): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,76): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,87): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(17,98): error TS2304: Cannot find name 'K_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,83): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,94): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,127): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,138): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,149): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,160): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,171): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(19,182): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(20,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(20,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(20,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(20,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(20,76): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(20,87): error TS2304: Cannot find name 'K_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,83): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,115): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,126): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,137): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,148): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(22,159): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(23,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(23,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(23,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(23,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(23,76): error TS2304: Cannot find name 'K_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,72): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,103): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,114): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,125): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(25,136): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(26,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(26,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(26,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(26,65): error TS2304: Cannot find name 'K_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(28,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(28,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(28,61): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(28,91): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(28,102): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(28,113): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(29,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(29,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(29,54): error TS2304: Cannot find name 'K_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(31,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(31,50): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(31,79): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(31,90): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(32,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(32,43): error TS2304: Cannot find name 'K_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(34,39): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(34,67): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(35,32): error TS2304: Cannot find name 'K_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(49,25): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(51,29): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(51,35): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(53,33): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(53,39): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(53,45): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(55,37): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(55,43): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(55,49): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(55,55): error TS2304: Cannot find name 'U_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(57,41): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(57,47): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(57,53): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(57,59): error TS2304: Cannot find name 'U_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(57,65): error TS2304: Cannot find name 'U_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(59,45): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(59,51): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(59,57): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(59,63): error TS2304: Cannot find name 'U_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(59,69): error TS2304: Cannot find name 'U_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(59,75): error TS2304: Cannot find name 'U_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,49): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,55): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,61): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,67): error TS2304: Cannot find name 'U_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,73): error TS2304: Cannot find name 'U_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,79): error TS2304: Cannot find name 'U_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(61,85): error TS2304: Cannot find name 'U_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,53): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,59): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,65): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,71): error TS2304: Cannot find name 'U_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,77): error TS2304: Cannot find name 'U_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,83): error TS2304: Cannot find name 'U_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,89): error TS2304: Cannot find name 'U_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(63,95): error TS2304: Cannot find name 'U_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,57): error TS2304: Cannot find name 'U_1'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,63): error TS2304: Cannot find name 'U_2'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,69): error TS2304: Cannot find name 'U_3'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,75): error TS2304: Cannot find name 'U_4'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,81): error TS2304: Cannot find name 'U_5'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,87): error TS2304: Cannot find name 'U_6'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,93): error TS2304: Cannot find name 'U_7'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,99): error TS2304: Cannot find name 'U_8'.
declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts(65,105): error TS2304: Cannot find name 'U_9'.


==== declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.d.ts (265 errors) ====
    // Note that both of the following have an `any` in their return type from where we bottom out the type printout
    // for having too many instances of the same symbol nesting.
    // Slightly simplified repro from https://github.com/microsoft/TypeScript/issues/30732 so it's easier to read and debug
    export type Key<U> = keyof U;
    export type Value<K extends Key<U>, U> = U[K];
    export declare const updateIfChanged: <T>(t: T) => (<K extends keyof T>(key: K) => (<K extends keyof Value<K_1, T>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, T>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, T>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>(key: K) => (<K extends keyof Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>(key: K) => /*elided*/ any & {
                                                                                                               ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                        ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                                                                                                        ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_9'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_9'.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ~~~~
!!! error TS2304: Cannot find name 'K_10'.
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_9'.
                                                                                                                                             ~~~~
!!! error TS2304: Cannot find name 'K_10'.
                                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_9'.
                                                                                                                                                                                                                                                                                      ~~~~
!!! error TS2304: Cannot find name 'K_10'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, Value<K_10, T>>>>>>>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_9'.
                                                                                                                                      ~~~~
!!! error TS2304: Cannot find name 'K_10'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_9'.
                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                                        ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_9'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, Value<K_9, T>>>>>>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_9'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_8'.
                                                                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_8'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, Value<K_8, T>>>>>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_8'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_7'.
                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                                         ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                                    ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                               ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_7'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, Value<K_7, T>>>>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_7'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_6'.
                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                                        ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                                                                                         ~~~
!!! error TS2304: Cannot find name 'K_6'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, Value<K_6, T>>>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_6'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_5'.
                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                                 ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_5'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, Value<K_5, T>>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                               ~~~
!!! error TS2304: Cannot find name 'K_5'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
                                                                                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                                                                           ~~~
!!! error TS2304: Cannot find name 'K_4'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, Value<K_4, T>>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'K_4'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, Value<K_3, T>>>>) => Value<K, Value<K_1, Value<K_2, Value<K_3, T>>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'K_3'.
                                                                                              ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                                         ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                                                    ~~~
!!! error TS2304: Cannot find name 'K_3'.
        set: (newU: Value<K, Value<K_1, Value<K_2, Value<K_3, T>>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                         ~~~
!!! error TS2304: Cannot find name 'K_3'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, Value<K_2, T>>>) => Value<K, Value<K_1, Value<K_2, T>>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                     ~~~
!!! error TS2304: Cannot find name 'K_2'.
                                                                                  ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                                             ~~~
!!! error TS2304: Cannot find name 'K_2'.
        set: (newU: Value<K, Value<K_1, Value<K_2, T>>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'K_2'.
    }) & {
        map: (updater: (u: Value<K, Value<K_1, T>>) => Value<K, Value<K_1, T>>) => T;
                                          ~~~
!!! error TS2304: Cannot find name 'K_1'.
                                                                      ~~~
!!! error TS2304: Cannot find name 'K_1'.
        set: (newU: Value<K, Value<K_1, T>>) => T;
                                   ~~~
!!! error TS2304: Cannot find name 'K_1'.
    }) & {
        map: (updater: (u: Value<K, T>) => Value<K, T>) => T;
        set: (newU: Value<K, T>) => T;
    }) & {
        map: (updater: (u: T) => T) => T;
        set: (newU: T) => T;
    };
    // example from https://github.com/microsoft/TypeScript/issues/31605
    export declare const testRecFun: <T extends Object>(parent: T) => {
        result: T;
        deeper: <U extends Object>(child: U) => {
            result: T & U;
            deeper: <U extends Object>(child: U) => {
                result: T & U_1 & U;
                            ~~~
!!! error TS2304: Cannot find name 'U_1'.
                deeper: <U extends Object>(child: U) => {
                    result: T & U_1 & U_2 & U;
                                ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                      ~~~
!!! error TS2304: Cannot find name 'U_2'.
                    deeper: <U extends Object>(child: U) => {
                        result: T & U_1 & U_2 & U_3 & U;
                                    ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                          ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                ~~~
!!! error TS2304: Cannot find name 'U_3'.
                        deeper: <U extends Object>(child: U) => {
                            result: T & U_1 & U_2 & U_3 & U_4 & U;
                                        ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                              ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                    ~~~
!!! error TS2304: Cannot find name 'U_3'.
                                                          ~~~
!!! error TS2304: Cannot find name 'U_4'.
                            deeper: <U extends Object>(child: U) => {
                                result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U;
                                            ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                                  ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                        ~~~
!!! error TS2304: Cannot find name 'U_3'.
                                                              ~~~
!!! error TS2304: Cannot find name 'U_4'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'U_5'.
                                deeper: <U extends Object>(child: U) => {
                                    result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U;
                                                ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                                      ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                            ~~~
!!! error TS2304: Cannot find name 'U_3'.
                                                                  ~~~
!!! error TS2304: Cannot find name 'U_4'.
                                                                        ~~~
!!! error TS2304: Cannot find name 'U_5'.
                                                                              ~~~
!!! error TS2304: Cannot find name 'U_6'.
                                    deeper: <U extends Object>(child: U) => {
                                        result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U;
                                                    ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                                          ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                                ~~~
!!! error TS2304: Cannot find name 'U_3'.
                                                                      ~~~
!!! error TS2304: Cannot find name 'U_4'.
                                                                            ~~~
!!! error TS2304: Cannot find name 'U_5'.
                                                                                  ~~~
!!! error TS2304: Cannot find name 'U_6'.
                                                                                        ~~~
!!! error TS2304: Cannot find name 'U_7'.
                                        deeper: <U extends Object>(child: U) => {
                                            result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U;
                                                        ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                                              ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                                    ~~~
!!! error TS2304: Cannot find name 'U_3'.
                                                                          ~~~
!!! error TS2304: Cannot find name 'U_4'.
                                                                                ~~~
!!! error TS2304: Cannot find name 'U_5'.
                                                                                      ~~~
!!! error TS2304: Cannot find name 'U_6'.
                                                                                            ~~~
!!! error TS2304: Cannot find name 'U_7'.
                                                                                                  ~~~
!!! error TS2304: Cannot find name 'U_8'.
                                            deeper: <U extends Object>(child: U) => {
                                                result: T & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U_9 & U;
                                                            ~~~
!!! error TS2304: Cannot find name 'U_1'.
                                                                  ~~~
!!! error TS2304: Cannot find name 'U_2'.
                                                                        ~~~
!!! error TS2304: Cannot find name 'U_3'.
                                                                              ~~~
!!! error TS2304: Cannot find name 'U_4'.
                                                                                    ~~~
!!! error TS2304: Cannot find name 'U_5'.
                                                                                          ~~~
!!! error TS2304: Cannot find name 'U_6'.
                                                                                                ~~~
!!! error TS2304: Cannot find name 'U_7'.
                                                                                                      ~~~
!!! error TS2304: Cannot find name 'U_8'.
                                                                                                            ~~~
!!! error TS2304: Cannot find name 'U_9'.
                                                deeper: <U extends Object>(child: U) => /*elided*/ any;
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
    