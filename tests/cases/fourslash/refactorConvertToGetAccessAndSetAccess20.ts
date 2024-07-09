/// <reference path='fourslash.ts' />

//// class A {
////     public a_1: number;
////     /*a*/public a: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    public a_1: number;
    private /*RENAME*/_a: string;
    public get a(): string {
        return this._a;
    }
    public set a(value: string) {
        this._a = value;
    }
}`,
});
