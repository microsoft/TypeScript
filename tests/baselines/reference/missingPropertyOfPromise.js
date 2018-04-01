//// [missingPropertyOfPromise.ts]
function f(x: Promise<string>) {
    x.toLowerCase();
}


//// [missingPropertyOfPromise.js]
function f(x) {
    x.toLowerCase();
}
