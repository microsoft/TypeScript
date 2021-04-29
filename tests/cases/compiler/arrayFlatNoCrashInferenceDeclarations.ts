// @strict: true
// @lib: es2020
// @declaration: true
function foo<T>(arr: T[], depth: number) {
    return arr.flat(depth);
}