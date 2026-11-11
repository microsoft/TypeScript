//// [tests/cases/compiler/thisInObjectLiteralMethodAsyncReturn.ts] ////

//// [thisInObjectLiteralMethodAsyncReturn.ts]
// https://github.com/microsoft/TypeScript/issues/64954

const test1 = async () => {
    return {
        value: 5,
        method() {
            this satisfies { value: number, method(): void };
        },
    };
};

const test2: () => Promise<{
    value: number;
    method(): void;
}> = async () => {
    return {
        value: 5,
        method() {
            this satisfies { value: number, method(): void };
        },
    };
};

// Ordinary, non-async object literal with thenable contextual type
type T = {
    then(cb: (n: number) => void): void;
    value?: number;
    method(): void;
};
const x: T = {
    then() {},
    method() {
        this.value = 1;
    },
};



//// [thisInObjectLiteralMethodAsyncReturn.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/64954
const test1 = async () => {
    return {
        value: 5,
        method() {
            this;
        },
    };
};
const test2 = async () => {
    return {
        value: 5,
        method() {
            this;
        },
    };
};
const x = {
    then() { },
    method() {
        this.value = 1;
    },
};
