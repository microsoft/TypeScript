//// [tests/cases/conformance/async/es5/awaitUnion_es5.ts] ////

//// [awaitUnion_es5.ts]
declare let a: number | string;
declare let b: PromiseLike<number> | PromiseLike<string>;
declare let c: PromiseLike<number | string>;
declare let d: number | PromiseLike<string>;
declare let e: number | PromiseLike<number | string>;
async function f() {
	let await_a = await a;
	let await_b = await b;
	let await_c = await c;
	let await_d = await d;
	let await_e = await e;
}

//// [awaitUnion_es5.js]
function f() {
    return __awaiter(this, void 0, void 0, function () {
        var await_a, await_b, await_c, await_d, await_e;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, a];
                case 1:
                    await_a = _a.sent();
                    return [4 /*yield*/, b];
                case 2:
                    await_b = _a.sent();
                    return [4 /*yield*/, c];
                case 3:
                    await_c = _a.sent();
                    return [4 /*yield*/, d];
                case 4:
                    await_d = _a.sent();
                    return [4 /*yield*/, e];
                case 5:
                    await_e = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
