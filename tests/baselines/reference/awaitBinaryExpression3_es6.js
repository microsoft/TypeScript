//// [awaitBinaryExpression3_es6.ts]
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    var b = await p + a;
    "after";
}

//// [awaitBinaryExpression3_es6.js]
function func() {
    return __awaiter(this, void 0, Promise, function* () {
        "before";
        var b = (yield p) + a;
        "after";
    });
}
