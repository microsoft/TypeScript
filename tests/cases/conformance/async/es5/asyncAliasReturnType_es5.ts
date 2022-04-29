// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
type PromiseAlias<T> = Promise<T>;

async function f(): PromiseAlias<void> {
}