// @target: ES6
// @noEmitHelpers: true
type PromiseAlias<T> = Promise<T>;

async function f(): PromiseAlias<void> {
}