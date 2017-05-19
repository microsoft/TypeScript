//// [awaitClassExpression_es6.ts]
declare class C { }
declare var p: Promise<typeof C>;

async function func(): Promise<void> {
    class D extends (await p) {
    }
}

//// [awaitClassExpression_es6.js]
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        class D extends (yield p) {
        }
    });
}
