// @target: esnext

Promise.try(() => {
    return "Sync result";
});

Promise.try(async () => {
    return "Async result";
});
