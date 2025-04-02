//// [tests/cases/conformance/async/es5/awaitCallExpression/awaitCallExpression7_es5.ts] ////

//// [awaitCallExpression7_es5.ts]
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
    var b = o.fn(a, await p, a);
    after();
}

//// [awaitCallExpression7_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    before();
                    _b = (_a = o).fn;
                    _c = [a];
                    return [4 /*yield*/, p];
                case 1:
                    b = _b.apply(_a, _c.concat([_d.sent(), a]));
                    after();
                    return [2 /*return*/];
            }
        });
    });
}
