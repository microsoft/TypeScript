/// <reference path='fourslash.ts' />

// @Target: ES6
// @Filename: file1.ts
//// class C1 {
////    public /*0*/x/*1*/: string;
//// }
//// let obj1: C1 = new C1();
//// obj1.x = "dummy";
//// let dummyString: string = obj1.x;


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
let obj1: C1 = new C1();
obj1.x = "dummy";
let dummyString: string = obj1.x;
`
}]});