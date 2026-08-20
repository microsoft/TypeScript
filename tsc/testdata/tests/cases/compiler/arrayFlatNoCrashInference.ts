// @target: es2015
// @strict: true
// @lib: es2020
function foo<T>(arr: T[], depth: number) {
    return arr.flat(depth);
}