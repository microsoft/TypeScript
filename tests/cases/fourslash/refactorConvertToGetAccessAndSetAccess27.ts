/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public "a-b": number = 1;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/"_a-b": number = 1;
    public get "a-b"(): number {
        return this["_a-b"];
    }
    public set "a-b"(value: number) {
        this["_a-b"] = value;
    }
}`,
});
