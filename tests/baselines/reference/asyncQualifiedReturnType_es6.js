//// [tests/cases/conformance/async/es6/asyncQualifiedReturnType_es6.ts] ////

//// [asyncQualifiedReturnType_es6.ts]
namespace X {
    export class MyPromise<T> extends Promise<T> {
    }
}

async function f(): X.MyPromise<void> {
}

//// [asyncQualifiedReturnType_es6.js]
var X;
(function (X) {
    class MyPromise extends Promise {
    }
    X.MyPromise = MyPromise;
})(X || (X = {}));
function f() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
