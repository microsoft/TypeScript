/// <reference path='fourslash.ts' />
// @allowJs: true
// @Filename: a.js
//// class A {
////     _a = 2;
////     /*a*/"a"/*b*/ = 1;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    _a = 2;
    /*RENAME*/"_a_1" = 1;
    get "a"() {
        return this["_a_1"];
    }
    set "a"(value) {
        this["_a_1"] = value;
    }
}`,
});
