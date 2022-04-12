/// <reference path='fourslash.ts' />

////class Foo {
////    bar() {
////        function test(this: string, foo: string) {
////            /*start*/console.log(this);
////            console.log(foo); /*end*/
////        }
////    }
////}


goTo.select("start", "end");
verify.refactorAvailable("Extract Symbol", "function_scope_1");
verify.not.refactorAvailable("Extract Symbol", "function_scope_2");
verify.refactorAvailable("Extract Symbol", "function_scope_3");

edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in function 'test'",
    newContent:
`class Foo {
    bar() {
        function test(this: string, foo: string) {
            /*RENAME*/newFunction.call(this); 


            function newFunction(this: string) {
                console.log(this);
                console.log(foo);
            }
        }
    }
}`
});