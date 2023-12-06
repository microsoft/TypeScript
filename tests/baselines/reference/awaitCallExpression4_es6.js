//// [tests/cases/conformance/async/es6/awaitCallExpression/awaitCallExpression4_es6.ts] ////

//// [awaitCallExpression4_es6.ts]
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
    var b = (await pfn)(a, a, a);
    after();
}

//// [awaitCallExpression4_es6.js]
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        before();
        var b = (yield pfn)(a, a, a);
        after();
    });
}
