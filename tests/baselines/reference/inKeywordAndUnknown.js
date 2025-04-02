//// [tests/cases/compiler/inKeywordAndUnknown.ts] ////

//// [inKeywordAndUnknown.ts]
// Repro from #50531

function f(x: {}, y: unknown) {
    if (!("a" in x)) {
        return;
    }
    x;  // {}
    if (!y) {
        return;
    }
    y;  // {}
    if (!("a" in y)) {
        return;
    }
    y;  // {}
}

// Repro from #51007

function isHTMLTable(table: unknown): boolean {
    return !!table && table instanceof Object && 'html' in table;
}

function f1(x: unknown) {
    return x && x instanceof Object && 'a' in x;
}

function f2<T>(x: T) {
    return x && x instanceof Object && 'a' in x;
}

function f3(x: {}) {
    return x instanceof Object && 'a' in x;
}

function f4<T extends {}>(x: T) {
    return x instanceof Object && 'a' in x;
}

function f5<T>(x: T & {}) {
    return x instanceof Object && 'a' in x;
}

function f6<T extends {}>(x: T & {}) {
    return x instanceof Object && 'a' in x;
}

function f7<T extends object>(x: T & {}) {
    return x instanceof Object && 'a' in x;
}


//// [inKeywordAndUnknown.js]
"use strict";
// Repro from #50531
function f(x, y) {
    if (!("a" in x)) {
        return;
    }
    x; // {}
    if (!y) {
        return;
    }
    y; // {}
    if (!("a" in y)) {
        return;
    }
    y; // {}
}
// Repro from #51007
function isHTMLTable(table) {
    return !!table && table instanceof Object && 'html' in table;
}
function f1(x) {
    return x && x instanceof Object && 'a' in x;
}
function f2(x) {
    return x && x instanceof Object && 'a' in x;
}
function f3(x) {
    return x instanceof Object && 'a' in x;
}
function f4(x) {
    return x instanceof Object && 'a' in x;
}
function f5(x) {
    return x instanceof Object && 'a' in x;
}
function f6(x) {
    return x instanceof Object && 'a' in x;
}
function f7(x) {
    return x instanceof Object && 'a' in x;
}
