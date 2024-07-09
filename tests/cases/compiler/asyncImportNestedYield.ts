// @lib: esnext
async function* foo() {
    import((await import(yield "foo")).default);
}