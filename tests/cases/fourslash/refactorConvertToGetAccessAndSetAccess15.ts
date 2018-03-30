/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public _a: number = 1;/*b*/
////     /*c*/public a: string = "foo";/*d*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private _a_1: number = 1;
    public get _a(): number {
        return this._a_1;
    }
    public set _a(value: number) {
        this._a_1 = value;
    }
    public a: string = "foo";
}`,
});

goTo.select("c", "d");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private _a_1: number = 1;
    public get _a(): number {
        return this._a_1;
    }
    public set _a(value: number) {
        this._a_1 = value;
    }
    private a_1: string = "foo";
    public get a(): string {
        return this.a_1;
    }
    public set a(value: string) {
        this.a_1 = value;
    }
}`,
});