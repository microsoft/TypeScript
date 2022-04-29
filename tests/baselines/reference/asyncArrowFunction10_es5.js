//// [asyncArrowFunction10_es5.ts]
var foo = async (): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncArrowFunction10_es5.js]
var _this = this;
var foo = function () { return __awaiter(_this, void 0, void 0, function () {
    var v;
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
