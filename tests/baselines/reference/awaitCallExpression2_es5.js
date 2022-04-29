//// [awaitCallExpression2_es5.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function fn(arg0: boolean, arg1: boolean, arg2: boolean): void;
declare var o: { fn(arg0: boolean, arg1: boolean, arg2: boolean): void; };
declare var pfn: Promise<{ (arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
declare var po: Promise<{ fn(arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = fn(await p, a, a);
    after();
}

//// [awaitCallExpression2_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    before();
                    _a = fn;
                    return [4 /*yield*/, p];
                case 1:
                    b = _a.apply(void 0, [_b.sent(), a, a]);
                    after();
                    return [2 /*return*/];
            }
        });
    });
}
