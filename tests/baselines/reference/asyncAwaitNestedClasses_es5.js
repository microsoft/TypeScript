//// [asyncAwaitNestedClasses_es5.ts]
// https://github.com/Microsoft/TypeScript/issues/20744
class A {
    static B = class B {
        static func2(): Promise<void> {
            return new Promise((resolve) => { resolve(null); });
        }
        static C = class C {
            static async func() {
                await B.func2();
            }
        }
    }
}

A.B.C.func();

//// [asyncAwaitNestedClasses_es5.js]
// https://github.com/Microsoft/TypeScript/issues/20744
var A = /** @class */ (function () {
    function A() {
    }
    var _a;
    A.B = (_a = /** @class */ (function () {
            function B() {
            }
            B.func2 = function () {
                return new Promise(function (resolve) { resolve(null); });
            };
            return B;
        }()),
        _a.C = /** @class */ (function () {
            function C() {
            }
            C.func = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, _a.func2()];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return C;
        }()),
        _a);
    return A;
}());
A.B.C.func();
