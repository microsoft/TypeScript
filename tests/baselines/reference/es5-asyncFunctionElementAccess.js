//// [es5-asyncFunctionElementAccess.ts]
declare var x, y, z, a, b, c;

async function elementAccess0() {
    z = await x[y];
}

async function elementAccess1() {
    z = (await x)[y];
}

async function elementAccess2() {
    z = x[await y];
}


//// [es5-asyncFunctionElementAccess.js]
function elementAccess0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x[y]];
                case 1:
                    z = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function elementAccess1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    z = (_b.sent())[y];
                    return [2 /*return*/];
            }
        });
    });
}
function elementAccess2() {
    return __awaiter(this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = x;
                    return [4 /*yield*/, y];
                case 1:
                    z = _c[_d.sent()];
                    return [2 /*return*/];
            }
        });
    });
}
