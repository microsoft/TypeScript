/// <reference path='fourslash.ts' />
// @allowJs: true
// @Filename: a.js
//// class A {
////     /*a*/a/*b*/ = 1;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    /*RENAME*/_a = 1;
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
}`,
});
