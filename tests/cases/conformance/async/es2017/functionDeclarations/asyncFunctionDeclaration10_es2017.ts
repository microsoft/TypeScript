// @target: es2017
// @noEmitHelpers: true
async function foo(a = await => await): Promise<void> {
}