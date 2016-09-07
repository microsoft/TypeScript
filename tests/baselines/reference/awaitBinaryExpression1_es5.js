//// [awaitBinaryExpression1_es5.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = await p || a;
    after();
}

//// [awaitBinaryExpression1_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    before();
                    return [4 /*yield*/, p];
                case 1:
                    b = (_a.sent()) || a;
                    after();
                    return [2 /*return*/];
            }
        });
    });
}
