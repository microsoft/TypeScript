/// <reference path='fourslash.ts' />

//// class Foo {
////     someMethod(m: number) {
////         /*start*/var x = m;
////         x = x * 3;
////         var y = 30;
////         var z = y + x;
////         console.log(z);/*end*/
////         var q = 10;
////         return q;
////     }
//// }

goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to method in class 'Foo'",
    newContent:
`class Foo {
    someMethod(m: number) {
        this./*RENAME*/newMethod(m);
        var q = 10;
        return q;
    }

    private newMethod(m: number) {
        var x = m;
        x = x * 3;
        var y = 30;
        var z = y + x;
        console.log(z);
    }
}`
});
