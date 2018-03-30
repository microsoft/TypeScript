/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/_a: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private _a_1: string;
    public get _a(): string {
        return this._a_1;
    }
    public set _a(value: string) {
        this._a_1 = value;
    }
}`,
});
