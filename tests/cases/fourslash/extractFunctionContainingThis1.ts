/// <reference path='fourslash.ts' />


////function test(this: string, foo: string) {
////    /*start*/console.log(this);
////    console.log(foo); /*end*/
////}

goTo.select("start", "end");
verify.refactorAvailable("Extract Symbol", "function_scope_0");

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function test(this: string, foo: string) {
    /*RENAME*/newFunction.call(this, foo); 
}

function newFunction(this: string, foo: string) {
    console.log(this);
    console.log(foo);
}
`
});