//// [tests/cases/compiler/indexSignatureAndMappedType.ts] ////

//// [indexSignatureAndMappedType.ts]
// A mapped type { [P in K]: X }, where K is a generic type, is related to
// { [key: string]: Y } if X is related to Y.

function f1<T, K extends string>(x: { [key: string]: T }, y: Record<K, T>) {
    x = y;
    y = x;  // Error
}

function f2<T>(x: { [key: string]: T }, y: Record<string, T>) {
    x = y;
    y = x;
}

function f3<T, U, K extends string>(x: { [key: string]: T }, y: Record<K, U>) {
    x = y;  // Error
    y = x;  // Error
}

// Repro from #14548

type Dictionary = {
    [key: string]: string;
};

interface IBaseEntity {
    name: string;
    properties: Dictionary;
}

interface IEntity<T extends string> extends IBaseEntity {
    properties: Record<T, string>;
}


//// [indexSignatureAndMappedType.js]
"use strict";
// A mapped type { [P in K]: X }, where K is a generic type, is related to
// { [key: string]: Y } if X is related to Y.
function f1(x, y) {
    x = y;
    y = x; // Error
}
function f2(x, y) {
    x = y;
    y = x;
}
function f3(x, y) {
    x = y; // Error
    y = x; // Error
}


//// [indexSignatureAndMappedType.d.ts]
declare function f1<T, K extends string>(x: {
    [key: string]: T;
}, y: Record<K, T>): void;
declare function f2<T>(x: {
    [key: string]: T;
}, y: Record<string, T>): void;
declare function f3<T, U, K extends string>(x: {
    [key: string]: T;
}, y: Record<K, U>): void;
type Dictionary = {
    [key: string]: string;
};
interface IBaseEntity {
    name: string;
    properties: Dictionary;
}
interface IEntity<T extends string> extends IBaseEntity {
    properties: Record<T, string>;
}
