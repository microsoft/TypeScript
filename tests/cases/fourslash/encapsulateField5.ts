/// <reference path='fourslash.ts' />

// @Target: ES6
// @Filename: file1.ts
//// class C1 {
////    public /*0*/x/*1*/;
//// }


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
class C1 {
    private _x;

    set x(newx) {
        this._x = newx;
    }

    get x() {
        return this._x;
    }
}
`
}]});