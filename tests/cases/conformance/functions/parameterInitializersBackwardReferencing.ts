// @target: es5, es2015, esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/38243

function test0({ a = 0, b = a } = {}) {
    return { a, b };
}

function test1({ c: { a = 0, b = a } = {} } = {}) {
    return { a, b };
}