/// <reference path='fourslash.ts' />

//// class A {
////     public readonly /*a*/a/*b*/: number;
////     constructor () {
////         if (Math.random()) {
////             this.a = 1; // only top level assignment
////         }
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
        if (Math.random()) {
            this.a = 1; // only top level assignment
        }
    }
}`,
});
