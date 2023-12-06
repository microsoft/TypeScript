//// [tests/cases/conformance/async/es5/awaitCallExpression/awaitCallExpression1_es5.ts] ////

//// [awaitCallExpression1_es5.ts]
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
    var b = fn(a, a, a);
    after();
}

//// [awaitCallExpression1_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var b;
        return __generator(this, function (_a) {
            before();
            b = fn(a, a, a);
            after();
            return [2 /*return*/];
        });
    });
}
