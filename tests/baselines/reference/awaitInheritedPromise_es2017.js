//// [awaitInheritedPromise_es2017.ts]
interface A extends Promise<string> {}
declare var a: A;
async function f() {
    await a;
}

//// [awaitInheritedPromise_es2017.js]
async function f() {
    await a;
}
