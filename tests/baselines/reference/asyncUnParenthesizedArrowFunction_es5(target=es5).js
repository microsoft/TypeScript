//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es5.ts] ////

//// [asyncUnParenthesizedArrowFunction_es5.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es5.js]
var _this = this;
var x = function (i) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, someOtherFunction(i)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var x1 = function (i) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, someOtherFunction(i)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
