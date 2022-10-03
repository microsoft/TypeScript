/// <reference path='fourslash.ts' />

//// class A {
////     public /*a*/a/*b*/ = 1;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/_a = 1;
    public get a() {
        return this._a;
    }
    public set a(value) {
        this._a = value;
    }
}`,
});
