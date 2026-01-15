// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
async function foo(a = await => await): Promise<void> {
}