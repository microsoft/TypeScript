//// [tests/cases/compiler/modularizeLibrary_Worker.asynciterable.ts] ////

//// [modularizeLibrary_Worker.asynciterable.ts]
navigator.storage.getDirectory().then(async directory => {
    for await (const [key, handle] of directory) {
        handle.kind;
    }
});


//// [modularizeLibrary_Worker.asynciterable.js]
navigator.storage.getDirectory().then(async (directory) => {
    for await (const [key, handle] of directory) {
        handle.kind;
    }
});
