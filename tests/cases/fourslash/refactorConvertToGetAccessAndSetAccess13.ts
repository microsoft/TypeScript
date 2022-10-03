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
    private static /*RENAME*/_a: string = "foo";
    public static get a(): string {
        return A._a;
    }
    public static set a(value: string) {
        A._a = value;
    }
}`,
});
