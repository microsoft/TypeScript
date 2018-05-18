/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public static "a": number = 1;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private static /*RENAME*/"_a": number = 1;
    public static get "a"(): number {
        return A["_a"];
    }
    public static set "a"(value: number) {
        A["_a"] = value;
    }
}`,
});
