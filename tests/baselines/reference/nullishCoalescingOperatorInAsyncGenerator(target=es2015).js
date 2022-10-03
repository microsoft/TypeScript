//// [nullishCoalescingOperatorInAsyncGenerator.ts]
// https://github.com/microsoft/TypeScript/issues/37686
async function* f(a: { b?: number }) {
    let c = a.b ?? 10;
    while (c) {
        yield c--;
    }
}


//// [nullishCoalescingOperatorInAsyncGenerator.js]
// https://github.com/microsoft/TypeScript/issues/37686
function f(a) {
    var _a;
    return __asyncGenerator(this, arguments, function* f_1() {
        let c = (_a = a.b) !== null && _a !== void 0 ? _a : 10;
        while (c) {
            yield yield __await(c--);
        }
    });
}
