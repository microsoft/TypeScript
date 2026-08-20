// @strict: false
// @lib: es5,es2015.promise
// @target: ES5, ES2015
declare var x;

async function empty() {
}

async function singleAwait() {
    await x;
}