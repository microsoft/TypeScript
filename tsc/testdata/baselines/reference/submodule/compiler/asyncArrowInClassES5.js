//// [tests/cases/compiler/asyncArrowInClassES5.ts] ////

//// [asyncArrowInClassES5.ts]
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`

class Test {
    static member = async (x: string) => { };
}


//// [asyncArrowInClassES5.js]
class Test {
    static member = async (x) => { };
}
