/// <reference path='fourslash.ts' />


////const foo = {
////    bar: "1",
////    baz() {
////        /*start*/console.log(this);
////        console.log(this.bar);/*end*/
////    }
////}

goTo.select("start", "end");
verify.refactorAvailable("Extract Symbol", "function_scope_0");
verify.refactorAvailable("Extract Symbol", "function_scope_1");

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`const foo = {
    bar: "1",
    baz() {
        /*RENAME*/newFunction.call(this);
    }
}

function newFunction(this: any) {
    console.log(this);
    console.log(this.bar);
}
`
});