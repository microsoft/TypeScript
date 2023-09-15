//// [tests/cases/compiler/narrowingTypeofDiscriminant.ts] ////

//// [narrowingTypeofDiscriminant.ts]
function f1(obj: { kind: 'a', data: string } | { kind: 1, data: number }) {
    if (typeof obj.kind === "string") {
        obj;  // { kind: 'a', data: string }
    }
    else {
        obj;  // { kind: 1, data: number }
    }
}

function f2(obj: { kind: 'a', data: string } | { kind: 1, data: number } | undefined) {
    if (typeof obj?.kind === "string") {
        obj;  // { kind: 'a', data: string }
    }
    else {
        obj;  // { kind: 1, data: number } | undefined
    }
}

// Repro from #51700

type WrappedStringOr<T> = { value?: string } | { value?: T };

function numberOk(wrapped: WrappedStringOr<number> | null) {
    if (typeof wrapped?.value !== 'string') {
        return null;
    }
    return wrapped.value;
}

function booleanBad(wrapped: WrappedStringOr<boolean> | null) {
    if (typeof wrapped?.value !== 'string') {
        return null;
    }
    return wrapped.value;
}

function booleanFixed(wrapped: WrappedStringOr<boolean> | null) {
    if (typeof (wrapped?.value) !== 'string') {
        return null;
    }
    return wrapped.value;
}


//// [narrowingTypeofDiscriminant.js]
"use strict";
function f1(obj) {
    if (typeof obj.kind === "string") {
        obj; // { kind: 'a', data: string }
    }
    else {
        obj; // { kind: 1, data: number }
    }
}
function f2(obj) {
    if (typeof (obj === null || obj === void 0 ? void 0 : obj.kind) === "string") {
        obj; // { kind: 'a', data: string }
    }
    else {
        obj; // { kind: 1, data: number } | undefined
    }
}
function numberOk(wrapped) {
    if (typeof (wrapped === null || wrapped === void 0 ? void 0 : wrapped.value) !== 'string') {
        return null;
    }
    return wrapped.value;
}
function booleanBad(wrapped) {
    if (typeof (wrapped === null || wrapped === void 0 ? void 0 : wrapped.value) !== 'string') {
        return null;
    }
    return wrapped.value;
}
function booleanFixed(wrapped) {
    if (typeof (wrapped === null || wrapped === void 0 ? void 0 : wrapped.value) !== 'string') {
        return null;
    }
    return wrapped.value;
}
