// @target: es2017
// @noEmitHelpers: true
type PromiseAlias<T> = Promise<T>;

async function f(): PromiseAlias<void> {
}