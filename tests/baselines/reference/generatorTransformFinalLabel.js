//// [tests/cases/compiler/generatorTransformFinalLabel.ts] ////

//// [generatorTransformFinalLabel.ts]
async function test(skip: boolean) {
    if (!skip) {
        await 1
    }
    else {
        throw Error('test')
    }
}

//// [generatorTransformFinalLabel.js]
function test(skip) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!skip) return [3 /*break*/, 2];
                    return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: throw Error('test');
                case 3: return [2 /*return*/];
            }
        });
    });
}
