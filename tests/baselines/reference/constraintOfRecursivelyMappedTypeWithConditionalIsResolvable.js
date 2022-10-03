//// [constraintOfRecursivelyMappedTypeWithConditionalIsResolvable.ts]
// https://github.com/Microsoft/TypeScript/issues/25379

interface Map<K, V> {
    // ...
}

export type ImmutableTypes = IImmutableMap<any>;

export type ImmutableModel<T> = { [K in keyof T]: T[K] extends ImmutableTypes ? T[K] : never };

export interface IImmutableMap<T extends ImmutableModel<T>> extends Map<string, any> {
    set<K extends keyof T>(key: K, value: T[K]): IImmutableMap<T>;
}

export type ImmutableTypes2 = IImmutableMap2<any>;
type isImmutableType<T> = [T] extends [ImmutableTypes2] ? T : never;
export type ImmutableModel2<T> = { [K in keyof T]: isImmutableType<T[K]> };
export interface IImmutableMap2<T extends ImmutableModel2<T>> extends Map<string, any> {
    set<K extends keyof T>(key: K, value: T[K]): IImmutableMap2<T>;
}


//// [constraintOfRecursivelyMappedTypeWithConditionalIsResolvable.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/25379
exports.__esModule = true;
