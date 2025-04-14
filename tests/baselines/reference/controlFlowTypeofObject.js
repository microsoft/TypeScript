//// [tests/cases/conformance/controlFlow/controlFlowTypeofObject.ts] ////

//// [controlFlowTypeofObject.ts]
declare function obj(x: object): void;

function f1(x: unknown) {
    if (!x) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f2(x: unknown) {
    if (x === null) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f3(x: unknown) {
    if (x == null) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f4(x: unknown) {
    if (x == undefined) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f5(x: unknown) {
    if (!!true) {
        if (!x) {
            return;
        }
    }
    else {
        if (x === null) {
            return;
        }
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f6(x: unknown) {
    if (x === null) {
        x;
    }
    else {
        x;
        if (typeof x === 'object') {
            obj(x);
        }
    }
    if (typeof x === 'object') {
        obj(x);  // Error
    }
}


//// [controlFlowTypeofObject.js]
"use strict";
function f1(x) {
    if (!x) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}
function f2(x) {
    if (x === null) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}
function f3(x) {
    if (x == null) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}
function f4(x) {
    if (x == undefined) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}
function f5(x) {
    if (!!true) {
        if (!x) {
            return;
        }
    }
    else {
        if (x === null) {
            return;
        }
    }
    if (typeof x === 'object') {
        obj(x);
    }
}
function f6(x) {
    if (x === null) {
        x;
    }
    else {
        x;
        if (typeof x === 'object') {
            obj(x);
        }
    }
    if (typeof x === 'object') {
        obj(x); // Error
    }
}


//// [controlFlowTypeofObject.d.ts]
declare function obj(x: object): void;
declare function f1(x: unknown): void;
declare function f2(x: unknown): void;
declare function f3(x: unknown): void;
declare function f4(x: unknown): void;
declare function f5(x: unknown): void;
declare function f6(x: unknown): void;
