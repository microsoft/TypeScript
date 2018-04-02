/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public a: number = 1;/*b*/
////     public _a: string = "foo";
////     public _a_1: string = "bar";
////     public _a_2: string = "baz";
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/_a_3: number = 1;
    public get a(): number {
        return this._a_3;
    }
    public set a(value: number) {
        this._a_3 = value;
    }
    public _a: string = "foo";
    public _a_1: string = "bar";
    public _a_2: string = "baz";
}`,
});
