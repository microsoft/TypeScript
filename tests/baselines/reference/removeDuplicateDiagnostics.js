//// [removeDuplicateDiagnostics.ts]
/* eslint-disable linebreak-style */
class X {
  foo() {
    return 1;
  }

  get foo() {
    return 1;
  }
}


//// [removeDuplicateDiagnostics.js]
/* eslint-disable linebreak-style */
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.foo = function () {
        return 1;
    };
    Object.defineProperty(X.prototype, "foo", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return X;
}());
