/// <reference path='fourslash.ts' />

// @Target: ES3
// @Filename: file1.ts
//// class C1 {
////    public /*0*/x/*1*/: number;
//// }
//// let obj1: C1 = new C1();
//// obj1.x = 2789 + 9876 - 8769;
//// let dummyNumber: number;
//// dummyNumber = obj1.x/678 + obj1.x*765;


verify.codeRefactor({
    description: "Encapsulate Field",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
class C1 {
    private _x: number;

    public setx(newx : number) {
        this._x = newx;
    }

    public getx() : number {
        return this._x;
    }
}
let obj1: C1 = new C1();
obj1.setx(2789 + 9876 - 8769);
let dummyNumber: number;
dummyNumber = obj1.getx()/678 + obj1.getx()*765;
`
}]});