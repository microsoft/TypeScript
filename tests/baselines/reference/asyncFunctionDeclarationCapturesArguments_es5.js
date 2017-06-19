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
            return __awaiter(this, arguments, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, other.apply(this, arguments)];
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
