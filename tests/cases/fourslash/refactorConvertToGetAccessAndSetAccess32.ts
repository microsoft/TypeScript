/// <reference path='fourslash.ts' />

//// /** Class comment */
//// class A {
////     // Field comment
////     public /*a*/a/*b*/: number = 1;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `/** Class comment */
class A {
    // Field comment
    private /*RENAME*/_a: number = 1;
    public get a(): number {
        return this._a;
    }
    public set a(value: number) {
        this._a = value;
    }
}`,
});
