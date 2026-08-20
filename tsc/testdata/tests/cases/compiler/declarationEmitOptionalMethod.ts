// @module: commonjs
// @target: es2015
// @declaration: true
// @strictNullChecks: true
export const Foo = (opts: {
    a?(): void,
    b?: () => void,
}): {
    c?(): void,
    d?: () => void,
} => ({  });