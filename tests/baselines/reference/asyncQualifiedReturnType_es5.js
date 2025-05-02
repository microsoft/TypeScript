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
    var MyPromise = /** @class */ (function (_super) {
        __extends(MyPromise, _super);
        function MyPromise() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MyPromise;
    }(Promise));
    X.MyPromise = MyPromise;
})(X || (X = {}));
function f() {
    return __awaiter(this, void 0, X.MyPromise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
