// @target: es5, es2015
// @lib: es5,es6
// @noEmitHelpers: true
async function test(skip: boolean) {
    if (!skip) {
        await 1
    }
    else {
        throw Error('test')
    }
}