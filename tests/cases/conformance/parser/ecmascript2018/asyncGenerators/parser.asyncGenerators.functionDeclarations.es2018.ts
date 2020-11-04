// @target: es2018
// @lib: esnext
// @noEmit: true
// @filename: functionDeclarationIsOk.ts
async function * f1() {
}
// @filename: awaitNameIsOk.ts
async function * await() {
}
// @filename: yieldNameIsOk.ts
async function * yield() {
}
// @filename: awaitParameterIsError.ts
async function * f4(await) {
}
// @filename: yieldParameterIsError.ts
async function * f5(yield) {
}
// @filename: awaitInParameterInitializerIsError.ts
async function * f6(a = await 1) {
}
// @filename: yieldInParameterInitializerIsError.ts
async function * f7(a = yield) {
}
// @filename: nestedAsyncGeneratorIsOk.ts
async function * f8() {
    async function * g() {
    }
}
// @filename: nestedFunctionDeclarationNamedYieldIsError.ts
async function * f9() {
    function yield() {
    }
}
// @filename: nestedFunctionExpressionNamedYieldIsError.ts
async function * f10() {
    const x = function yield() {
    };
}
// @filename: nestedFunctionDeclarationNamedAwaitIsError.ts
async function * f11() {
    function await() {
    }
}
// @filename: nestedFunctionExpressionNamedAwaitIsError.ts
async function * f12() {
    const x = function yield() {
    };
}
// @filename: yieldIsOk.ts
async function * f13() {
    yield;
}
// @filename: yieldWithValueIsOk.ts
async function * f14() {
    yield 1;
}
// @filename: yieldStarMissingValueIsError.ts
async function * f15() {
    yield *;
}
// @filename: yieldStarWithValueIsOk.ts
async function * f16() {
    yield * [];
}
// @filename: awaitWithValueIsOk.ts
async function * f17() {
    await 1;
}
// @filename: awaitMissingValueIsError.ts
async function * f18() {
    await;
}
// @filename: awaitAsTypeIsOk.ts
interface await {}
async function * f19() {
    let x: await;
}
// @filename: yieldAsTypeIsOk.ts
interface yield {}
async function * f20() {
    let x: yield;
}
// @filename: yieldInNestedComputedPropertyIsOk.ts
async function * f21() {
    const x = { [yield]: 1 };
}
