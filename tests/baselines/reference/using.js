//// [using.ts]
export class DisposableClass {
    public foo() {

    }

    public dispose() {
    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}

//// [using.js]
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
var disposedObj = new DisposableClass();
try {
    disposedObj.foo();
}
finally {
    if (typeof disposedObj !== "undefined") disposedObj.dispose();
}
