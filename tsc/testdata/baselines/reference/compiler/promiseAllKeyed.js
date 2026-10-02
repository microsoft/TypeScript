//// [tests/cases/compiler/promiseAllKeyed.ts] ////

//// [promiseAllKeyed.ts]
declare const key: unique symbol;

const values = {
    a: 1 as number,
    b: Promise.resolve("value"),
    c: { then(resolve: (value: boolean) => void) { resolve(true); } },
    [key]: Promise.resolve(42),
} as const;

async function testAllKeyed() {
    const result = await Promise.allKeyed(values);
    const a: number = result.a;
    const b: string = result.b;
    const c: boolean = result.c;
    const d: number = result[key];

    result.a = 2;
}

async function testAllSettledKeyed() {
    const result = await Promise.allSettledKeyed(values);

    if (result.b.status === "fulfilled") {
        const value: string = result.b.value;
    }
    else {
        const reason: any = result.b.reason;
    }

    if (result[key].status === "fulfilled") {
        const value: number = result[key].value;
    }
}

interface Input {
    a: Promise<number>;
    b: string;
}

declare const input: Input;

const allResult: Promise<{ a: number; b: string; }> = Promise.allKeyed(input);
const allSettledResult: Promise<{
    a: PromiseSettledResult<number>;
    b: PromiseSettledResult<string>;
}> = Promise.allSettledKeyed(input);

Promise.try(() => 1);

Promise.allKeyed(0);

Promise.allSettledKeyed("value");

Promise.allKeyed(null);

Promise.allSettledKeyed(undefined);


//// [promiseAllKeyed.js]
"use strict";
const values = {
    a: 1,
    b: Promise.resolve("value"),
    c: { then(resolve) { resolve(true); } },
    [key]: Promise.resolve(42),
};
async function testAllKeyed() {
    const result = await Promise.allKeyed(values);
    const a = result.a;
    const b = result.b;
    const c = result.c;
    const d = result[key];
    result.a = 2;
}
async function testAllSettledKeyed() {
    const result = await Promise.allSettledKeyed(values);
    if (result.b.status === "fulfilled") {
        const value = result.b.value;
    }
    else {
        const reason = result.b.reason;
    }
    if (result[key].status === "fulfilled") {
        const value = result[key].value;
    }
}
const allResult = Promise.allKeyed(input);
const allSettledResult = Promise.allSettledKeyed(input);
Promise.try(() => 1);
Promise.allKeyed(0);
Promise.allSettledKeyed("value");
Promise.allKeyed(null);
Promise.allSettledKeyed(undefined);
