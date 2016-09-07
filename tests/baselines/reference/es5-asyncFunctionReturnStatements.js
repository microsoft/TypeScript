//// [es5-asyncFunctionReturnStatements.ts]
declare var x, y, z, a, b, c;

async function returnStatement0(): Promise<any> {
    return;
}

async function returnStatement1(): Promise<any> {
    return x;
}

async function returnStatement2(): Promise<any> {
    return await x;
}

async function returnStatement3(): Promise<any> {
    { return; }
}

async function returnStatement4(): Promise<any> {
    await x;
    { return; }
}

async function returnStatement5(): Promise<any>{
    { return await x; }
}

//// [es5-asyncFunctionReturnStatements.js]
function returnStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function returnStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, x];
        });
    });
}
function returnStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function returnStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            {
                return [2 /*return*/];
            }
            return [2 /*return*/];
        });
    });
}
function returnStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    {
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function returnStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
