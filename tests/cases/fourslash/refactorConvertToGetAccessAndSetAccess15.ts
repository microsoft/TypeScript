/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public _a: number = 1;/*b*/
////     public a: string = "foo";
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private _a: number = 1;
    public get /*RENAME*/a_1(): number {
        return this._a;
    }
    public set a_1(value: number) {
        this._a = value;
    }
    public a: string = "foo";
}`,
});
