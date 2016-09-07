// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
namespace X {
    export class MyPromise<T> extends Promise<T> {
    }
}

async function f(): X.MyPromise<void> {
}