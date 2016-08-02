/// <reference path='fourslash.ts' />

// @Target: ES6
// @Filename: file1.ts
//// class C1 {
////    public /*0*/x/*1*/: string;
//// }


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
class C1 {
    private _x: string;

    set x(newx : string) {
        this._x = newx;
    }

    get x() : string {
        return this._x;
    }
}
`
}]});