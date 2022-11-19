//// [removeDuplicateDuplicateIdentifierDiagnostic.ts]
class X {
  foo() {
    return 1;
  }

  get foo() {
    return 1;
  }
}


//// [removeDuplicateDuplicateIdentifierDiagnostic.js]
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
