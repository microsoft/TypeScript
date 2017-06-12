//// [usingWithoutDispose.ts]
export class DisposableClass {
    public foo() {

    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}

//// [usingWithoutDispose.js]
"use strict";
exports.__esModule = true;
var DisposableClass = (function () {
    function DisposableClass() {
    }
    DisposableClass.prototype.foo = function () {
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
