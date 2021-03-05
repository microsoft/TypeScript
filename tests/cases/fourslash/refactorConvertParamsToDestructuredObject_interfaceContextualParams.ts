/// <reference path='fourslash.ts' />

////interface IFoo {
////    method(x: string, y: string): void;
////}
////const x: IFoo = {
////    method(/*a*/x, y/*b*/): void {},
////};

/*
When there are no type annotations on the params in the implementation, we ultimately
would like to handle them like we do for calls resulting in `method({x, y}) {}`.

Note that simply adding the annotations from the signature can fail as the implementation 
can take more paramters than the signatures.
*/
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `interface IFoo {
    method({ x, y }: { x: string; y: string; }): void;
}
const x: IFoo = {
    method({ x, y }: { x; y; }): void {},
};`
});
