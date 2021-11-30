//// [dependentDestructuredVariables.ts]
type Action =
    | { kind: 'A', payload: number }
    | { kind: 'B', payload: string };

function f10({ kind, payload }: Action) {
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}

function f11(action: Action) {
    const { kind, payload } = action;
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}

function f12({ kind, payload }: Action) {
    switch (kind) {
        case 'A':
            payload.toFixed();
            break;
        case 'B':
            payload.toUpperCase();
            break;
        default:
            payload;  // never
    }
}

type Action2 =
    | { kind: 'A', payload: number | undefined }
    | { kind: 'B', payload: string | undefined };

function f20({ kind, payload }: Action2) {
    if (payload) {
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}

function f21(action: Action2) {
    const { kind, payload } = action;
    if (payload) {
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}

function f22(action: Action2) {
    if (action.payload) {
        const { kind, payload } = action;
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}

function f23({ kind, payload }: Action2) {
    if (payload) {
        switch (kind) {
            case 'A':
                payload.toFixed();
                break;
            case 'B':
                payload.toUpperCase();
                break;
            default:
                payload;  // never
        }
    }
}

type Foo =
    | { kind: 'A', isA: true }
    | { kind: 'B', isA: false }
    | { kind: 'C', isA: false };

function f30({ kind, isA }: Foo) {
    if (kind === 'A') {
        isA;   // true
    }
    if (kind === 'B') {
        isA;   // false
    }
    if (kind === 'C') {
        isA;   // false
    }
    if (isA) {
        kind;  // 'A'
    }
    else {
        kind;  // 'B' | 'C'
    }
}

// Repro from #35283

interface A<T> { variant: 'a', value: T }

interface B<T> { variant: 'b', value: Array<T> }

type AB<T> = A<T> | B<T>;

declare function printValue<T>(t: T): void;

declare function printValueList<T>(t: Array<T>): void;

function unrefined1<T>(ab: AB<T>): void {
    const { variant, value } = ab;
    if (variant === 'a') {
        printValue<T>(value);
    }
    else {
        printValueList<T>(value);
    }
}

// Repro from #38020

type Action3 =
    | {type: 'add', payload: { toAdd: number } }
    | {type: 'remove', payload: { toRemove: number } };

const reducerBroken = (state: number, { type, payload }: Action3) => {
    switch (type) {
        case 'add':
            return state + payload.toAdd;
        case 'remove':
            return state - payload.toRemove;
    }
}

// Repro from #46143

declare var it: Iterator<number>;
const { value, done } = it.next();
if (!done) {
    value;  // number
}


//// [dependentDestructuredVariables.js]
"use strict";
function f10({ kind, payload }) {
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}
function f11(action) {
    const { kind, payload } = action;
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}
function f12({ kind, payload }) {
    switch (kind) {
        case 'A':
            payload.toFixed();
            break;
        case 'B':
            payload.toUpperCase();
            break;
        default:
            payload; // never
    }
}
function f20({ kind, payload }) {
    if (payload) {
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}
function f21(action) {
    const { kind, payload } = action;
    if (payload) {
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}
function f22(action) {
    if (action.payload) {
        const { kind, payload } = action;
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}
function f23({ kind, payload }) {
    if (payload) {
        switch (kind) {
            case 'A':
                payload.toFixed();
                break;
            case 'B':
                payload.toUpperCase();
                break;
            default:
                payload; // never
        }
    }
}
function f30({ kind, isA }) {
    if (kind === 'A') {
        isA; // true
    }
    if (kind === 'B') {
        isA; // false
    }
    if (kind === 'C') {
        isA; // false
    }
    if (isA) {
        kind; // 'A'
    }
    else {
        kind; // 'B' | 'C'
    }
}
function unrefined1(ab) {
    const { variant, value } = ab;
    if (variant === 'a') {
        printValue(value);
    }
    else {
        printValueList(value);
    }
}
const reducerBroken = (state, { type, payload }) => {
    switch (type) {
        case 'add':
            return state + payload.toAdd;
        case 'remove':
            return state - payload.toRemove;
    }
};
const { value, done } = it.next();
if (!done) {
    value; // number
}


//// [dependentDestructuredVariables.d.ts]
declare type Action = {
    kind: 'A';
    payload: number;
} | {
    kind: 'B';
    payload: string;
};
declare function f10({ kind, payload }: Action): void;
declare function f11(action: Action): void;
declare function f12({ kind, payload }: Action): void;
declare type Action2 = {
    kind: 'A';
    payload: number | undefined;
} | {
    kind: 'B';
    payload: string | undefined;
};
declare function f20({ kind, payload }: Action2): void;
declare function f21(action: Action2): void;
declare function f22(action: Action2): void;
declare function f23({ kind, payload }: Action2): void;
declare type Foo = {
    kind: 'A';
    isA: true;
} | {
    kind: 'B';
    isA: false;
} | {
    kind: 'C';
    isA: false;
};
declare function f30({ kind, isA }: Foo): void;
interface A<T> {
    variant: 'a';
    value: T;
}
interface B<T> {
    variant: 'b';
    value: Array<T>;
}
declare type AB<T> = A<T> | B<T>;
declare function printValue<T>(t: T): void;
declare function printValueList<T>(t: Array<T>): void;
declare function unrefined1<T>(ab: AB<T>): void;
declare type Action3 = {
    type: 'add';
    payload: {
        toAdd: number;
    };
} | {
    type: 'remove';
    payload: {
        toRemove: number;
    };
};
declare const reducerBroken: (state: number, { type, payload }: Action3) => number;
declare var it: Iterator<number>;
declare const value: any, done: boolean | undefined;
