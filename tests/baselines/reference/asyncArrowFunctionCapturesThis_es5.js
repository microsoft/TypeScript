//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunctionCapturesThis_es5.ts] ////

//// [asyncArrowFunctionCapturesThis_es5.ts]
class C {
   method() {
      var fn = async () => await this;
   }
}


//// [asyncArrowFunctionCapturesThis_es5.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        var _this = this;
        var fn = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
    };
    return C;
}());
