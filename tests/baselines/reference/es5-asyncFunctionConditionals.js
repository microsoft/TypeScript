//// [es5-asyncFunctionConditionals.ts]
declare var x, y, z, a, b, c;

async function conditional0() {
    a = (await x) ? y : z;
}

async function conditional1() {
    a = x ? await y : z;
}

async function conditional2() {
    a = x ? y : await z;
}

//// [es5-asyncFunctionConditionals.js]
function conditional0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    a = (_a.sent()) ? y : z;
                    return [2 /*return*/];
            }
        });
    });
}
function conditional1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = z;
                    _b.label = 3;
                case 3:
                    a = _a;
                    return [2 /*return*/];
            }
        });
    });
}
function conditional2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!x) return [3 /*break*/, 1];
                    _a = y;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, z];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    a = _a;
                    return [2 /*return*/];
            }
        });
    });
}
