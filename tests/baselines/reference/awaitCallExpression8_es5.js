//// [tests/cases/conformance/async/es5/awaitCallExpression/awaitCallExpression8_es5.ts] ////

//// [awaitCallExpression8_es5.ts]
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
    var b = (await po).fn(a, a, a);
    after();
}

//// [awaitCallExpression8_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    before();
                    return [4 /*yield*/, po];
                case 1:
                    b = (_a.sent()).fn(a, a, a);
                    after();
                    return [2 /*return*/];
            }
        });
    });
}
