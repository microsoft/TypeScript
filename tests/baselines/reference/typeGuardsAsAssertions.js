//// [typeGuardsAsAssertions.ts]
// Repro from #8513

let cond: boolean;

export type Optional<a> = Some<a> | None;

export interface None { readonly none: string; }
export interface Some<a> { readonly some: a; }

export const none : None = { none: '' };

export function isSome<a>(value: Optional<a>): value is Some<a> {
    return 'some' in value;
}

function someFrom<a>(some: a) {
    return { some };
}

export function fn<r>(makeSome: () => r): void {
    let result: Optional<r> = none;
    result;  // None
    while (cond) {
        result;  // Some<r> | None
        result = someFrom(isSome(result) ? result.some : makeSome());
        result;  // Some<r>
    }
}

function foo1() {
    let x: string | number | boolean = 0;
    x;  // number
    while (cond) {
        x;  // number, then string | number
        x = typeof x === "string" ? x.slice() : "abc";
        x;  // string
    }
    x;
}

function foo2() {
    let x: string | number | boolean = 0;
    x;  // number
    while (cond) {
        x;  // number, then string | number
        if (typeof x === "string") {
            x = x.slice();
        }
        else {
            x = "abc";
        }
        x;  // string
    }
    x;
}

// Type guards as assertions

function f1() {
    let x: string | number | undefined = undefined;
    x;  // undefined
    if (x) {
        x;  // string | number (guard as assertion)
    }
    x;  // string | number | undefined
}

function f2() {
    let x: string | number | undefined = undefined;
    x;  // undefined
    if (typeof x === "string") {
        x;  // string (guard as assertion)
    }
    x;  // string | undefined
}

function f3() {
    let x: string | number | undefined = undefined;
    x;  // undefined
    if (!x) {
        return;
    }
    x;  // string | number (guard as assertion)
}

function f4() {
    let x: string | number | undefined = undefined;
    x;  // undefined
    if (typeof x === "boolean") {
        x;  // nothing (boolean not in declared type)
    }
    x;  // undefined
}

function f5(x: string | number) {
    if (typeof x === "string" && typeof x === "number") {
        x;  // number (guard as assertion)
    }
    else {
        x;  // string | number
    }
    x;  // string | number
}

function f6() {
    let x: string | undefined | null;
    x!.slice();
    x = "";
    x!.slice();
    x = undefined;
    x!.slice();
    x = null;
    x!.slice();
    x = <undefined | null>undefined;
    x!.slice();
    x = <string | undefined>"";
    x!.slice();
    x = <string | null>"";
    x!.slice();
}

function f7() {
    let x: string;
    x!.slice();
}


//// [typeGuardsAsAssertions.js]
"use strict";
// Repro from #8513
exports.__esModule = true;
exports.fn = exports.isSome = exports.none = void 0;
var cond;
exports.none = { none: '' };
function isSome(value) {
    return 'some' in value;
}
exports.isSome = isSome;
function someFrom(some) {
    return { some: some };
}
function fn(makeSome) {
    var result = exports.none;
    result; // None
    while (cond) {
        result; // Some<r> | None
        result = someFrom(isSome(result) ? result.some : makeSome());
        result; // Some<r>
    }
}
exports.fn = fn;
function foo1() {
    var x = 0;
    x; // number
    while (cond) {
        x; // number, then string | number
        x = typeof x === "string" ? x.slice() : "abc";
        x; // string
    }
    x;
}
function foo2() {
    var x = 0;
    x; // number
    while (cond) {
        x; // number, then string | number
        if (typeof x === "string") {
            x = x.slice();
        }
        else {
            x = "abc";
        }
        x; // string
    }
    x;
}
// Type guards as assertions
function f1() {
    var x = undefined;
    x; // undefined
    if (x) {
        x; // string | number (guard as assertion)
    }
    x; // string | number | undefined
}
function f2() {
    var x = undefined;
    x; // undefined
    if (typeof x === "string") {
        x; // string (guard as assertion)
    }
    x; // string | undefined
}
function f3() {
    var x = undefined;
    x; // undefined
    if (!x) {
        return;
    }
    x; // string | number (guard as assertion)
}
function f4() {
    var x = undefined;
    x; // undefined
    if (typeof x === "boolean") {
        x; // nothing (boolean not in declared type)
    }
    x; // undefined
}
function f5(x) {
    if (typeof x === "string" && typeof x === "number") {
        x; // number (guard as assertion)
    }
    else {
        x; // string | number
    }
    x; // string | number
}
function f6() {
    var x;
    x.slice();
    x = "";
    x.slice();
    x = undefined;
    x.slice();
    x = null;
    x.slice();
    x = undefined;
    x.slice();
    x = "";
    x.slice();
    x = "";
    x.slice();
}
function f7() {
    var x;
    x.slice();
}
