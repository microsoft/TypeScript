//// [tests/cases/compiler/jsFileCompilationPublicParameterModifier.ts] ////

//// [a.js]
class C { constructor(public x) { }}

//// [a.js]
class C {
    x;
    constructor(x) {
        this.x = x;
    }
}
