/// <reference path='fourslash.ts' />

//// class A {
////     public a: string;
////     /*a*/b: number;/*b*/    
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    public a: string;
    private _b: number;
    public get b(): number {
        return this._b;
    }
    public set b(value: number) {
        this._b = value;
    }
}`,
});
