/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public static a: string = "foo";/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private static a_1: string = "foo";
    public static get a(): string {
        return A.a_1;
    }
    public static set a(value: string) {
        A.a_1 = value;
    }
}`,
});
