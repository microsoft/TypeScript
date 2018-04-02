/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public _a: number = 1;/*b*/
////     /*c*/public a: string = "foo";/*d*/
//// }

goTo.select("c", "d");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    public _a: number = 1;
    private /*RENAME*/_a_1: string = "foo";
    public get a(): string {
        return this._a_1;
    }
    public set a(value: string) {
        this._a_1 = value;
    }
}`,
});

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/__a: number = 1;
    public get _a(): number {
        return this.__a;
    }
    public set _a(value: number) {
        this.__a = value;
    }
    private _a_1: string = "foo";
    public get a(): string {
        return this._a_1;
    }
    public set a(value: string) {
        this._a_1 = value;
    }
}`,
});