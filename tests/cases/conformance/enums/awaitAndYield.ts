// @target: ES2019
// @noTypesAndSymbols: true
async function* test(x: Promise<number>) {
    enum E {
        foo = await x,
        baz = yield 1,
    }
}