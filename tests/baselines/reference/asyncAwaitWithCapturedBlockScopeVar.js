//// [asyncAwaitWithCapturedBlockScopeVar.ts]
async function fn1() {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
    }
}

async function fn2() {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
        break;
    }
}

async function fn3() {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
        continue;
    }
}

async function fn4(): Promise<number> {
    let ar = [];
    for (let i = 0; i < 1; i++) {
        await 1;
        ar.push(() => i);
        return 1;
    }
}


//// [asyncAwaitWithCapturedBlockScopeVar.js]
function fn1() {
    return __awaiter(this, void 0, void 0, function () {
        var ar, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ar = [];
                    _loop_1 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, 1];
                                case 1:
                                    _b.sent();
                                    ar.push(function () { return i; });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 1)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fn2() {
    return __awaiter(this, void 0, void 0, function () {
        var ar, _loop_2, i, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ar = [];
                    _loop_2 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, 1];
                                case 1:
                                    _b.sent();
                                    ar.push(function () { return i; });
                                    return [2 /*return*/, "break"];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 1)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i)];
                case 2:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 4];
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fn3() {
    return __awaiter(this, void 0, void 0, function () {
        var ar, _loop_3, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ar = [];
                    _loop_3 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, 1];
                                case 1:
                                    _b.sent();
                                    ar.push(function () { return i; });
                                    return [2 /*return*/, "continue"];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 1)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_3(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fn4() {
    return __awaiter(this, void 0, void 0, function () {
        var ar, _loop_4, i, state_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ar = [];
                    _loop_4 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, 1];
                                case 1:
                                    _b.sent();
                                    ar.push(function () { return i; });
                                    return [2 /*return*/, { value: 1 }];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 1)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_4(i)];
                case 2:
                    state_2 = _a.sent();
                    if (typeof state_2 === "object")
                        return [2 /*return*/, state_2.value];
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
