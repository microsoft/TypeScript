//// [asyncArrowFunction6_es5.ts]
var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es5.js]
var _this = this;
var foo = function (a) {
    if (a === void 0) { a = yield ; }
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
};
