/// <reference path='fourslash.ts' />

//// type B = { b: string };
//// type C = { c: number };
////
//// interface X<T extends { prop: /*1*/T | /*3*/B /*2*/| C/*4*/ }> {}

goTo.select("1", "2");
verify.not.refactorAvailable("Extract type");

goTo.select("3", "4");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type B = { b: string };
type C = { c: number };

type /*RENAME*/NewType = B | C;

interface X<T extends { prop: T | NewType }> {}`,
});
