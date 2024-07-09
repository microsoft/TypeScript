/// <reference path='fourslash.ts' />

// @strict: true

////class A {
////    /*a*/"\tfoo": "";/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent:
`class A {
    private /*RENAME*/"_\\tfoo": "";
    public get "\\tfoo"(): "" {
        return this["_\\tfoo"];
    }
    public set "\\tfoo"(value: "") {
        this["_\\tfoo"] = value;
    }
}`
});
