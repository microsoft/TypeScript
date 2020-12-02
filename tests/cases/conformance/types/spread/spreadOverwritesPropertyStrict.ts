// @strict: true
declare var ab: { a: number, b: number };
declare var abq: { a: number, b?: number };
var unused1 = { b: 1, ...ab } // error
var unused2 = { ...ab, ...ab } // ok, overwritten error doesn't apply to spreads
var unused3 = { b: 1, ...abq } // ok, abq might have b: undefined
var unused4 = { ...ab, b: 1 } // ok, we don't care that b in ab is overwritten
var unused5 = { ...abq, b: 1 } // ok
function g(obj: { x: number | undefined }) {
    return { x: 1, ...obj }; // ok, obj might have x: undefined
}
function f(obj: { x: number } | undefined) {
    return { x: 1, ...obj }; // ok, obj might be undefined
}
function h(obj: { x: number } | { x: string }) {
    return { x: 1, ...obj } // error
}
function i(b: boolean, t: { command: string, ok: string }) {
    return { command: "hi", ...(b ? t : {}) } // ok
}
function j() {
    return { ...{ command: "hi" } , ...{ command: "bye" } } // ok
}
function k(t: { command: string, ok: string }) {
    return { command: "hi", ...{ spoiler: true }, spoiler2: true, ...t } // error
}

function l(anyrequired: { a: any }) {
    return { a: 'zzz', ...anyrequired } // error
}
function m(anyoptional: { a?: any }) {
    return { a: 'zzz', ...anyoptional } // ok
}

