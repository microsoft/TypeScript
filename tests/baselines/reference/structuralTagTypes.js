//// [structuralTagTypes.ts]
export type Downcased = string & tag { downcased: void; };
export type Analyzed<T> = T & tag { analyzed: void; };
export type Paired = {
    x: number & tag {x: number;};
    y: number & tag {y: number;};
};

export function downcase(x: string): Downcased {
    return x.toLocaleLowerCase() as Downcased;
}

export function downcaseLit<T extends string>(x: T): T & Downcased {
    return x.toLocaleLowerCase() as T & Downcased;
}

export function isDowncase(x: string): x is Downcased {
    return null as any;
}

export function analyze<T>(x: T): Analyzed<T> {
    return x as Analyzed<T>;
}

export function isAnalyzed<T>(x: T): x is Analyzed<T> {
    return Math.random() > 0.33 ? false : true;
}

export function isPaired(x: {x: number, y: number}): x is Paired {
    return true;
}

export function makePair(x: number, y: number): Paired {
    return {x, y} as Paired;
}

const a = "ok";
export const b = downcase(a);
export const d = downcaseLit(b);

if (isDowncase(d)) {
    d;
}

const e = {data: { value: "str" }};
export const f = analyze(e);
if (isAnalyzed(e)) {
    e;
}

export const g = makePair(0, 0);
const h = {x: 0, y: 0};
if (isPaired(h)) {
    h;
}


//// [structuralTagTypes.js]
"use strict";
exports.__esModule = true;
function downcase(x) {
    return x.toLocaleLowerCase();
}
exports.downcase = downcase;
function downcaseLit(x) {
    return x.toLocaleLowerCase();
}
exports.downcaseLit = downcaseLit;
function isDowncase(x) {
    return null;
}
exports.isDowncase = isDowncase;
function analyze(x) {
    return x;
}
exports.analyze = analyze;
function isAnalyzed(x) {
    return Math.random() > 0.33 ? false : true;
}
exports.isAnalyzed = isAnalyzed;
function isPaired(x) {
    return true;
}
exports.isPaired = isPaired;
function makePair(x, y) {
    return { x: x, y: y };
}
exports.makePair = makePair;
var a = "ok";
exports.b = downcase(a);
exports.d = downcaseLit(exports.b);
if (isDowncase(exports.d)) {
    exports.d;
}
var e = { data: { value: "str" } };
exports.f = analyze(e);
if (isAnalyzed(e)) {
    e;
}
exports.g = makePair(0, 0);
var h = { x: 0, y: 0 };
if (isPaired(h)) {
    h;
}


//// [structuralTagTypes.d.ts]
export declare type Downcased = string & tag {
    downcased: void;
};
export declare type Analyzed<T> = T & tag {
    analyzed: void;
};
export declare type Paired = {
    x: number & tag {
        x: number;
    };
    y: number & tag {
        y: number;
    };
};
export declare function downcase(x: string): Downcased;
export declare function downcaseLit<T extends string>(x: T): T & Downcased;
export declare function isDowncase(x: string): x is Downcased;
export declare function analyze<T>(x: T): Analyzed<T>;
export declare function isAnalyzed<T>(x: T): x is Analyzed<T>;
export declare function isPaired(x: {
    x: number;
    y: number;
}): x is Paired;
export declare function makePair(x: number, y: number): Paired;
export declare const b: Downcased;
export declare const d: Downcased;
export declare const f: Analyzed<{
    data: {
        value: string;
    };
}>;
export declare const g: Paired;
