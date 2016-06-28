//// [asyncFunctionDeclaration15_es5.ts]
declare class Thenable { then(): void; }
declare let a: any;
declare let obj: { then: string; };
declare let thenable: Thenable;
async function fn1() { } // valid: Promise<void>
async function fn2(): { } { } // error
async function fn3(): any { } // error
async function fn4(): number { } // error
async function fn5(): PromiseLike<void> { } // error
async function fn6(): Thenable { } // error
async function fn7() { return; } // valid: Promise<void>
async function fn8() { return 1; } // valid: Promise<number>
async function fn9() { return null; } // valid: Promise<any>
async function fn10() { return undefined; } // valid: Promise<any>
async function fn11() { return a; } // valid: Promise<any>
async function fn12() { return obj; } // valid: Promise<{ then: string; }>
async function fn13() { return thenable; } // error
async function fn14() { await 1; } // valid: Promise<void>
async function fn15() { await null; } // valid: Promise<void>
async function fn16() { await undefined; } // valid: Promise<void>
async function fn17() { await a; } // valid: Promise<void>
async function fn18() { await obj; } // valid: Promise<void>
async function fn19() { await thenable; } // error


//// [asyncFunctionDeclaration15_es5.js]
function fn1() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // valid: Promise<void>
function fn2() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // error
function fn3() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // error
function fn4() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // error
function fn5() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // error
function fn6() {
    return __awaiter(this, void 0, Thenable, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // error
function fn7() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
} // valid: Promise<void>
function fn8() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, 1];
    }); });
} // valid: Promise<number>
function fn9() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, null];
    }); });
} // valid: Promise<any>
function fn10() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, undefined];
    }); });
} // valid: Promise<any>
function fn11() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, a];
    }); });
} // valid: Promise<any>
function fn12() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, obj];
    }); });
} // valid: Promise<{ then: string; }>
function fn13() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, thenable];
    }); });
} // error
function fn14() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, 1];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} // valid: Promise<void>
function fn15() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, null];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} // valid: Promise<void>
function fn16() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, undefined];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} // valid: Promise<void>
function fn17() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, a];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} // valid: Promise<void>
function fn18() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, obj];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} // valid: Promise<void>
function fn19() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, thenable];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} // error
