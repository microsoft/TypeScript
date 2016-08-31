/// <reference path='fourslash.ts' />

// @Target: ES3
// @Filename: file1.ts
//// class C1 {
////    public /*0*/x/*1*/: string;
//// }
//// let obj1: C1 = new C1();
//// obj1.x = "dummy";
//// let dummyString: string;
//// dummyString = obj1.x;


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
class C1 {
    private _x: string;

    public setx(newx : string) {
        this._x = newx;
    }

    public getx() : string {
        return this._x;
    }
}
let obj1: C1 = new C1();
obj1.setx("dummy");
let dummyString: string;
dummyString = obj1.getx();
`
}]});