//// [asyncArrowFunctionCapturesArguments_es5.ts]
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);
   }
}


//// [asyncArrowFunctionCapturesArguments_es5.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        var _this = this;
        function other() { }
        var fn = function () { return __awaiter(_this, arguments, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, other.apply(this, arguments)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
    };
    return C;
}());
