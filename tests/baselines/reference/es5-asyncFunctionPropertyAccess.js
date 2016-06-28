//// [es5-asyncFunctionPropertyAccess.ts]
declare var x, y, z, a, b, c;

async function propertyAccess0() {
    y = await x.a;
}

async function propertyAccess1() {
    y = (await x).a;
}

async function callExpression0() {
    await x(y, z);
}

//// [es5-asyncFunctionPropertyAccess.js]
function propertyAccess0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    y = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function propertyAccess1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    y = (_a.sent()).a;
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x(y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
