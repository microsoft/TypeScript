/// <reference path='fourslash.ts' />

////type Foo<T> = {
////    fn:
////        keyof T extends string
////            ? /*a*/(x: `${keyof T}Foo`, callback: (y: keyof T) => void) => void/*b*/
////            : never;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: [
        "type /*RENAME*/NewType<T> = (x: `${keyof T}Foo`, callback: (y: keyof T) => void) => void;",
        "",
        "type Foo<T> = {",
        "    fn:",
        "        keyof T extends string",
        "            ? NewType<T>",
        "            : never;",
        "}"
    ].join("\n"),
});
