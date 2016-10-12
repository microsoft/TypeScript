//// [asyncQualifiedReturnType_es2017.ts]
namespace X {
    export class MyPromise<T> extends Promise<T> {
    }
}

async function f(): X.MyPromise<void> {
}

//// [asyncQualifiedReturnType_es2017.js]
var X;
(function (X) {
    class MyPromise extends Promise {
    }
    X.MyPromise = MyPromise;
})(X || (X = {}));
async function f() {
}
