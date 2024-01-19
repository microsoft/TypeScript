// @skipLibCheck: true
// @lib: es2018,webworker,webworker.asynciterable
// @target: es2018

navigator.storage.getDirectory().then(async directory => {
    for await (const [key, handle] of directory) {
        handle.kind;
    }
});
