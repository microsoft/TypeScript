/// <reference path='fourslash.ts' />

//// class A {
////     public a_2: number;
////     /*a*/public a_1: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    public a_2: number;
    private /*RENAME*/_a_1: string;
    public get a_1(): string {
        return this._a_1;
    }
    public set a_1(value: string) {
        this._a_1 = value;
    }
}`,
});
