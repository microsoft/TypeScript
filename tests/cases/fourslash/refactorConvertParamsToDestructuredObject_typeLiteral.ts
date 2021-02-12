/// <reference path='fourslash.ts' />

////type Foo = {
////    method(x: string, y: string): void;
////}
////const x: Foo = {
////    method(/*a*/x: string, y: string/*b*/): void {},
////};

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `type Foo = {
    method({ x, y }: { x: string; y: string; }): void;
}
const x: Foo = {
    method({ x, y }: { x: string; y: string; }): void {},
};`
});
