//// [indexedAccessWithFreshObjectLiteral.ts]
function foo (id: string) {
    return {
        a: 1,
        b: "",
        c: true
    }[id]
}

function bar (id: 'a' | 'b') {
    return {
        a: 1,
        b: "",
        c: false
    }[id]
}

function baz(id: string) {
    return ({
        a: 123,
        b: ""
    } as Record<string, number | string>)[id]
}

function bazz(id: string) {
    return ({
        a: 123,
        b: ""
    } as { [k: string]: string | number})[id]
}


//// [indexedAccessWithFreshObjectLiteral.js]
"use strict";
function foo(id) {
    return {
        a: 1,
        b: "",
        c: true
    }[id];
}
function bar(id) {
    return {
        a: 1,
        b: "",
        c: false
    }[id];
}
function baz(id) {
    return {
        a: 123,
        b: ""
    }[id];
}
function bazz(id) {
    return {
        a: 123,
        b: ""
    }[id];
}
