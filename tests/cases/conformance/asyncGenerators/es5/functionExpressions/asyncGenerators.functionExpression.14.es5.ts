// @target: es5
// @lib: es2017
const f = async function * () {
    yield * f();
}