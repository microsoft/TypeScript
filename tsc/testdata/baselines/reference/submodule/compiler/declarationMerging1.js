//// [tests/cases/compiler/declarationMerging1.ts] ////

//// [file1.ts]
class A {
    protected _f: number;
    getF() { return this._f; }
}

//// [file2.ts]
interface A {
    run();
}

//// [file1.js]
class A {
    _f;
    getF() { return this._f; }
}
//// [file2.js]
