// @lib: es5,es2015.promise
// @target: ES5
declare var x;

async function empty() {
}

async function singleAwait() {
    await x;
}