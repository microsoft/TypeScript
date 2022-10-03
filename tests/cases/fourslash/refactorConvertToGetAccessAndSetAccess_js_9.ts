/// <reference path='fourslash.ts' />
// @allowJs: true
// @Filename: a.js
//// class A {
////     static /*a*/a/*b*/ = 1;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    static /*RENAME*/_a = 1;
    static get a() {
        return A._a;
    }
    static set a(value) {
        A._a = value;
    }
}`,
});
