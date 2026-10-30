//// [tests/cases/compiler/indexMappedTypeWithFilteredKeysWithNegationErrors.ts] ////

//// [indexMappedTypeWithFilteredKeysWithNegationErrors.ts]
type FilteredFunction<T> = T extends string ? never : () => T;

function makeFunction<T>(): FilteredFunction<T> {
    // When T is string, FilteredFunction<T> is never, but this still returns a function.
    return () => { throw new Error(); };
}

const impossibleFunction: never = makeFunction<string>();

type FilteredPair<T> = T extends boolean ? never : [T, T];

function makePair<T>(value: [T & not boolean, T & not boolean]): FilteredPair<T> {
    // The tuple elements can come from different union members, unlike the distributed FilteredPair<T>.
    return value;
}

const homogeneousPair: [string, string] | [number, number] = makePair<string | number>(["a", 1]);

type Omitted<T> = "a" extends T ? never : "b";
type DependentFilter<T> = T extends Omitted<T> ? never : T;

function dependentFilter<T>(value: T & not Omitted<T>): DependentFilter<T> {
    // For T = "a" | "b", Omitted<T> is never, so value can be "b", but DependentFilter<T> is "a".
    return value;
}

const onlyA: "a" = dependentFilter<"a" | "b">("b");

type Filter<T, U> = T extends U ? never : T;

function unfiltered<T, U>(value: T): Filter<T, U> {
    // value can still belong to U, whose members are excluded from Filter<T, U>.
    return value;
}

type FilteredKeys<T> = {
    [K in keyof T as K extends "b" ? never : K]: T[K]
};

function excludedKey<T>(value: keyof T & not "c"): keyof FilteredKeys<T> {
    // Excluding "c" does not prevent value from being the filtered-out key "b".
    return value;
}

function unrelatedKey<T>(value: string & not "b"): keyof FilteredKeys<T> {
    // value is not constrained to keyof T and may name a property T does not have.
    return value;
}

type RemappedKeys<T> = {
    [K in keyof T as ("a" | "b") extends K ? K : never]: T[K]
};

function remappedKey<T extends { a: unknown; b: unknown }>(
    value: keyof T & not "c"
): keyof RemappedKeys<T> {
    // For T with just "a" and "b", neither key accepts their union, so no keys survive.
    return value;
}

type DependentKeys<T> = {
    [K in keyof T as K extends Omitted<K> ? never : K]: T[K]
};

function dependentKey<T>(value: keyof T & not Omitted<keyof T>): keyof DependentKeys<T> {
    // For T = { a: number; b: number }, value can be "b", but only "a" survives the per-key filter.
    return value;
}

type Repeated<T extends string> = T extends "skip" ? never : `${T}-${T}`;

function repeated<T extends string>(value: `${T & not "skip"}-${T & not "skip"}`): Repeated<T> {
    // value can mix different union members in its two T positions, unlike Repeated<T>.
    return value;
}

const same: "a-a" | "b-b" = repeated<"a" | "b">("a-b");

type Correlated<T> = T extends string ? never : T & { value: T };

function correlated<T>(value: T & not string & { value: T & not string }): Correlated<T> {
    // The outer T and the value property's T can come from different union members, unlike Correlated<T>.
    return value;
}

function trueFunction<T>(value: () => (string & { value: T })): FilteredFunction<string & { value: T }> {
    // The check type always extends string, so the result is never, not a function.
    return value;
}

function unionFunction<T>(value: () => ([T] | string)): FilteredFunction<[T] | string> {
    // The string union member is filtered out, so the returned function must return [T], not string.
    return value;
}


//// [indexMappedTypeWithFilteredKeysWithNegationErrors.js]
"use strict";
function makeFunction() {
    // When T is string, FilteredFunction<T> is never, but this still returns a function.
    return () => { throw new Error(); };
}
const impossibleFunction = makeFunction();
function makePair(value) {
    // The tuple elements can come from different union members, unlike the distributed FilteredPair<T>.
    return value;
}
const homogeneousPair = makePair(["a", 1]);
function dependentFilter(value) {
    // For T = "a" | "b", Omitted<T> is never, so value can be "b", but DependentFilter<T> is "a".
    return value;
}
const onlyA = dependentFilter("b");
function unfiltered(value) {
    // value can still belong to U, whose members are excluded from Filter<T, U>.
    return value;
}
function excludedKey(value) {
    // Excluding "c" does not prevent value from being the filtered-out key "b".
    return value;
}
function unrelatedKey(value) {
    // value is not constrained to keyof T and may name a property T does not have.
    return value;
}
function remappedKey(value) {
    // For T with just "a" and "b", neither key accepts their union, so no keys survive.
    return value;
}
function dependentKey(value) {
    // For T = { a: number; b: number }, value can be "b", but only "a" survives the per-key filter.
    return value;
}
function repeated(value) {
    // value can mix different union members in its two T positions, unlike Repeated<T>.
    return value;
}
const same = repeated("a-b");
function correlated(value) {
    // The outer T and the value property's T can come from different union members, unlike Correlated<T>.
    return value;
}
function trueFunction(value) {
    // The check type always extends string, so the result is never, not a function.
    return value;
}
function unionFunction(value) {
    // The string union member is filtered out, so the returned function must return [T], not string.
    return value;
}
