/// <reference path='fourslash.ts' />

////const key = "key";
////type Foo = /*a*/`${typeof key}Foo`/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: [
        "const key = \"key\";",
        "type /*RENAME*/NewType = `${typeof key}Foo`;",
        "",
        "type Foo = NewType;"
    ].join("\n"),
});
