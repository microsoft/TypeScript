// @target: es6
// @lib: es2017
const f = async function * () {
    yield * f();
}