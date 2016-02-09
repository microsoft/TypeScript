//// [awaitBinaryExpression5_es6.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    var o: { a: boolean; };
    o.a = await p;
    "after";
}

//// [awaitBinaryExpression5_es6.js]
function func() {
    return __awaiter(this, void 0, Promise, function* () {
        "before";
        var o;
        o.a = yield p;
        "after";
    });
}
