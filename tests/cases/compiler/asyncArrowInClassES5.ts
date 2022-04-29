// @noEmitHelpers: true
// @lib: es2015
// @target: es5
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`

class Test {
    static member = async (x: string) => { };
}
