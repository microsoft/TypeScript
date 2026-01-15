// @target: es2018
// @lib: esnext
// @noEmit: true
// @filename: functionExpressionIsOk.ts
const f1 = async function * f() {
};
// @filename: awaitNameIsError.ts
const f2 = async function * await() {
};
// @filename: yieldNameIsError.ts
const f3 = async function * yield() {
};
// @filename: awaitParameterIsError.ts
const f4 = async function * (await) {
};
// @filename: yieldParameterIsError.ts
const f5 = async function * (yield) {
};
// @filename: awaitInParameterInitializerIsError.ts
const f6 = async function * (a = await 1) {
};
// @filename: yieldInParameterInitializerIsError.ts
const f7 = async function * (a = yield) {
};
// @filename: nestedAsyncGeneratorIsOk.ts
const f8 = async function * () {
    async function * g() {
    }
};
// @filename: nestedFunctionDeclarationNamedYieldIsError.ts
const f9 = async function * () {
    function yield() {
    }
};
// @filename: nestedFunctionExpressionNamedYieldIsError.ts
const f10 = async function * () {
    const x = function yield() {
    };
};
// @filename: nestedFunctionDeclarationNamedAwaitIsError.ts
const f11 = async function * () {
    function await() {
    }
};
// @filename: nestedFunctionExpressionNamedAwaitIsError.ts
const f12 = async function * () {
    const x = function await() {
    };
};
// @filename: yieldIsOk.ts
const f13 = async function * () {
    yield;
};
// @filename: yieldWithValueIsOk.ts
const f14 = async function * () {
    yield 1;
};
// @filename: yieldStarMissingValueIsError.ts
const f15 = async function * () {
    yield *;
};
// @filename: yieldStarWithValueIsOk.ts
const f16 = async function * () {
    yield * [];
};
// @filename: awaitWithValueIsOk.ts
const f17 = async function * () {
    await 1;
};
// @filename: awaitMissingValueIsError.ts
const f18 = async function * () {
    await;
};
// @filename: awaitAsTypeIsOk.ts
interface await {}
const f19 = async function * () {
    let x: await;
};
// @filename: yieldAsTypeIsOk.ts
interface yield {}
const f20 = async function * () {
    let x: yield;
};
// @filename: yieldInNestedComputedPropertyIsOk.ts
const f21 = async function *() {
    const x = { [yield]: 1 };
};
