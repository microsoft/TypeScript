//// [tests/cases/compiler/promiseTry.ts] ////

//// [promiseTry.ts]
Promise.try(() => {
    return "Sync result";
});

Promise.try(async () => {
    return "Async result";
});

const a = Promise.try(() => "Sync result");
const b = Promise.try(async () => "Async result");

// SINGLE PARAMETER
Promise.try((foo: string) => "Async result", "foo");
Promise.try((foo) => "Async result", "foo");
Promise.try((foo) => "Async result");
Promise.try((foo: string | undefined) => "Async result", undefined);
Promise.try((foo: string | undefined) => "Async result", "foo");
Promise.try((foo) => "Async result", undefined);
Promise.try(() => "Async result", "foo");

// MULTIPLE PARAMETERS
Promise.try((foo: string, bar: number) => "Async result", "foo", 42);
Promise.try((foo: string, bar: number) => "Async result", "foo", 42, "baz");
Promise.try((foo: string, bar: number) => "Async result", "foo");
Promise.try((foo: string, bar?: number) => "Async result", "foo");
Promise.try((foo: string, bar?: number) => "Async result", "foo", undefined);
Promise.try((foo: string, bar?: number) => "Async result", "foo", 42);


//// [promiseTry.js]
"use strict";
Promise.try(() => {
    return "Sync result";
});
Promise.try(async () => {
    return "Async result";
});
const a = Promise.try(() => "Sync result");
const b = Promise.try(async () => "Async result");
// SINGLE PARAMETER
Promise.try((foo) => "Async result", "foo");
Promise.try((foo) => "Async result", "foo");
Promise.try((foo) => "Async result");
Promise.try((foo) => "Async result", undefined);
Promise.try((foo) => "Async result", "foo");
Promise.try((foo) => "Async result", undefined);
Promise.try(() => "Async result", "foo");
// MULTIPLE PARAMETERS
Promise.try((foo, bar) => "Async result", "foo", 42);
Promise.try((foo, bar) => "Async result", "foo", 42, "baz");
Promise.try((foo, bar) => "Async result", "foo");
Promise.try((foo, bar) => "Async result", "foo");
Promise.try((foo, bar) => "Async result", "foo", undefined);
Promise.try((foo, bar) => "Async result", "foo", 42);
