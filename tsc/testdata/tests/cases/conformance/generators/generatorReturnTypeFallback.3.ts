// @target: esnext
// @lib: es5,es2015.iterable
// @noemit: true
// @strict: true

function* f() {
    const x: string = yield 1;
}