// @target: ES6
// @noEmitHelpers: true
namespace X {
    export class MyPromise<T> extends Promise<T> {
    }
}

async function f(): X.MyPromise<void> {
}