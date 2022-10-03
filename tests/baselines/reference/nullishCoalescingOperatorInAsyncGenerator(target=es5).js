//// [nullishCoalescingOperatorInAsyncGenerator.ts]
// https://github.com/microsoft/TypeScript/issues/37686
async function* f(a: { b?: number }) {
    let c = a.b ?? 10;
    while (c) {
        yield c--;
    }
}


//// [nullishCoalescingOperatorInAsyncGenerator.js]
// https://github.com/microsoft/TypeScript/issues/37686
function f(a) {
    var _a;
    return __asyncGenerator(this, arguments, function f_1() {
        var c;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = (_a = a.b) !== null && _a !== void 0 ? _a : 10;
                    _b.label = 1;
                case 1:
                    if (!c) return [3 /*break*/, 4];
                    return [4 /*yield*/, __await(c--)];
                case 2: return [4 /*yield*/, _b.sent()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
