/// <reference path='fourslash.ts' />

//// class A {
////     public _a: string = "";
////     /*a*/public "a": number = 1;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    public _a: string = "";
    private /*RENAME*/"_a_1": number = 1;
    public get "a"(): number {
        return this["_a_1"];
    }
    public set "a"(value: number) {
        this["_a_1"] = value;
    }
}`,
});
