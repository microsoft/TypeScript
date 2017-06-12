//// [usingDisposeWithArgs.ts]
export class DisposableClass {
    public foo() {

    }

    public dispose(x: number) {
    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}

//// [usingDisposeWithArgs.js]
"use strict";
exports.__esModule = true;
var DisposableClass = (function () {
    function DisposableClass() {
    }
    DisposableClass.prototype.foo = function () {
    };
    DisposableClass.prototype.dispose = function (x) {
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
