/// <reference path='fourslash.ts' />

////interface IFoo {
////    method(x: string, y: string): void;
////}
////const x: IFoo = {
////    method(/*a*/x: string, y: string, z?: string/*b*/): void {},
////};

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `interface IFoo {
    method({ x, y }: { x: string; y: string; }): void;
}
const x: IFoo = {
    method({ x, y, z }: { x: string; y: string; z?: string; }): void {},
};`
});
