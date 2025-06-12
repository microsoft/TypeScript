//// [tests/cases/conformance/async/es5/awaitBinaryExpression/awaitBinaryExpression5_es5.ts] ////

//// [awaitBinaryExpression5_es5.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var o: { a: boolean; };
    o.a = await p;
    after();
}

//// [awaitBinaryExpression5_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        before();
        var o;
        o.a = yield p;
        after();
    });
}
