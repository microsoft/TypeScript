//// [tests/cases/compiler/modularizeLibrary_Dom.asynciterable.ts] ////

//// [modularizeLibrary_Dom.asynciterable.ts]
navigator.storage.getDirectory().then(async directory => {
    for await (const [key, handle] of directory) {
        handle.kind;
    }
});


//// [modularizeLibrary_Dom.asynciterable.js]
navigator.storage.getDirectory().then(async (directory) => {
    for await (const [key, handle] of directory) {
        handle.kind;
    }
});
