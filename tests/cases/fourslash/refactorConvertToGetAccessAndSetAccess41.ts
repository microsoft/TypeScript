/// <reference path='fourslash.ts' />

// @strict: true

////class A {
////    /*a*/"\\foo": "";/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent:
`class A {
    private /*RENAME*/"_\\\\foo": "";
    public get "\\\\foo"(): "" {
        return this["_\\\\foo"];
    }
    public set "\\\\foo"(value: "") {
        this["_\\\\foo"] = value;
    }
}`
});
