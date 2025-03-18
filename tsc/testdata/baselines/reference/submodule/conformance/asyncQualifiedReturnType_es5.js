//// [tests/cases/conformance/async/es5/asyncQualifiedReturnType_es5.ts] ////

//// [asyncQualifiedReturnType_es5.ts]
namespace X {
    export class MyPromise<T> extends Promise<T> {
    }
}

async function f(): X.MyPromise<void> {
}

//// [asyncQualifiedReturnType_es5.js]
var X;
(function (X) {
    class MyPromise extends Promise {
    }
    X.MyPromise = MyPromise;
})(X || (X = {}));
async function f() {
}
