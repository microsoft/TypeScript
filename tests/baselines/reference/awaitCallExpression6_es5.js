//// [awaitCallExpression6_es5.ts]
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
    var b = o.fn(await p, a, a);
    after();
}

//// [awaitCallExpression6_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    before();
                    _b = (_a = o).fn;
                    return [4 /*yield*/, p];
                case 1:
                    b = _b.apply(_a, [_c.sent(), a, a]);
                    after();
                    return [2 /*return*/];
            }
        });
    });
}
