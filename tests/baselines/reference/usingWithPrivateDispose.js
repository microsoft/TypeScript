//// [usingWithPrivateDispose.ts]
export class DisposableClass {
    public foo() {

    }

    private dispose() {
    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}

//// [usingWithPrivateDispose.js]
"use strict";
exports.__esModule = true;
var DisposableClass = (function () {
    function DisposableClass() {
    }
    DisposableClass.prototype.foo = function () {
    };
    DisposableClass.prototype.dispose = function () {
    };
    return DisposableClass;
}());
exports.DisposableClass = DisposableClass;
var disposedObj;
try {
    disposedObj = new DisposableClass();
    disposedObj.foo();
}
finally {
    if (typeof disposedObj !== "undefined") disposedObj.dispose();
}
