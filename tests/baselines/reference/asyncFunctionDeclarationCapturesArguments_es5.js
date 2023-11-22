//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclarationCapturesArguments_es5.ts] ////

//// [asyncFunctionDeclarationCapturesArguments_es5.ts]
class C {
   method() {
      function other() {}
      async function fn () {
           await other.apply(this, arguments);
      }
   }
}


//// [asyncFunctionDeclarationCapturesArguments_es5.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        function other() { }
        function fn() {
            var arguments_1 = arguments;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, other.apply(this, arguments_1)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
    return C;
}());
