// @target: es2017
// @strictNullChecks: true
interface A extends Promise<string> {}
declare var a: A;
async function f() {
    await a;
}