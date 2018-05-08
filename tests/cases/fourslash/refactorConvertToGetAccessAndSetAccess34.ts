/// <reference path='fourslash.ts' />

//// class A {
////     public readonly /*a*/a/*b*/: number;
////     constructor () {
////         this["a"] = 1;
////     }
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/_a: number;
    public get a(): number {
        return this._a;
    }
    constructor () {
        this["_a"] = 1;
    }
}`,
});
