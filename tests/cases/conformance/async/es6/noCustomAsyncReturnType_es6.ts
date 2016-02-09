// @target: ES6
// @noCustomAsyncPromise: true

interface Promise<T> extends PromiseLike<T> {}
var Promise: PromiseConstructorLike;

export async function f(): Promise<void> {
}
