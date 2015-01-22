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
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
            "before";
            var b = (yield p) + a;
            "after";
        }()));
    });
}
