// @module: commonjs
// @target: es2015
// @lib: esnext
async function* foo() {
    import((await import(yield "foo")).default);
}