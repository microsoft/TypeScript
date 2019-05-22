//// [declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.ts]
// Note that both of the following have an `any` in their return type from where we bottom out the type printout
// for havign too many instances of the same symbol nesting.

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


//// [declarationsWithRecursiveInternalTypesProduceUniqueTypeParams.js]
"use strict";
// Note that both of the following have an `any` in their return type from where we bottom out the type printout
// for havign too many instances of the same symbol nesting.
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
