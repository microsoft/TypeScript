//// [tests/cases/conformance/async/es6/awaitUnion_es6.ts] ////

//// [awaitUnion_es6.ts]
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

//// [awaitUnion_es6.js]
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        let await_a = yield a;
        let await_b = yield b;
        let await_c = yield c;
        let await_d = yield d;
        let await_e = yield e;
    });
}
