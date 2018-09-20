//// [asyncUseStrict_es5.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "use strict";
    var b = await p || a;
}

//// [asyncUseStrict_es5.js]
function func() {
    "use strict";
    return __awaiter(this, void 0, void 0, function () {
        var b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p];
                case 1:
                    b = (_a.sent()) || a;
                    return [2 /*return*/];
            }
        });
    });
}
