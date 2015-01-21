//// [awaitBinaryExpression2_es6.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    var b = await p && a;
    "after";
}

//// [awaitBinaryExpression2_es6.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
            "before";
            var b = (yield p) && a;
            "after";
        }()));
    });
}
