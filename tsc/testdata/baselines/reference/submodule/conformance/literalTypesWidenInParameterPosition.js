//// [tests/cases/conformance/types/literal/literalTypesWidenInParameterPosition.ts] ////

//// [literalTypesWidenInParameterPosition.ts]
class D {
    readonly noWiden = 1
    constructor(readonly widen = 2) {
        this.noWiden = 5; // error
        this.widen = 6; // ok
    }
}
new D(7); // ok


//// [literalTypesWidenInParameterPosition.js]
class D {
    widen;
    noWiden = 1;
    constructor(widen = 2) {
        this.widen = widen;
        this.noWiden = 5;
        this.widen = 6;
    }
}
new D(7);
