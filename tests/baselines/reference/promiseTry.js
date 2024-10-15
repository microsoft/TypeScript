//// [tests/cases/compiler/promiseTry.ts] ////

//// [promiseTry.ts]
Promise.try(() => {
    return "Sync result";
});

Promise.try(async () => {
    return "Async result";
});


//// [promiseTry.js]
Promise.try(() => {
    return "Sync result";
});
Promise.try(async () => {
    return "Async result";
});
