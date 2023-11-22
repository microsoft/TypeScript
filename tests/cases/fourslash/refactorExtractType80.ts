/// <reference path='fourslash.ts' />

//// type B = string;
//// type C = number;
//// 
//// export function foo<T extends boolean | /*1*/B | C/*2*/>(x: T): T {
////     return x;
//// }

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: 
`type B = string;
type C = number;

type /*RENAME*/NewType = B | C;

export function foo<T extends boolean | NewType>(x: T): T {
    return x;
}`,
});
