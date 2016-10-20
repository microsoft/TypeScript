//// [awaitBinaryExpression4_es6.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = (await p, a);
    after();
}

//// [awaitBinaryExpression4_es6.js]
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        before();
        var b = (yield p, a);
        after();
    });
}
