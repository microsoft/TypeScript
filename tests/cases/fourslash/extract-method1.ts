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
    refactorName: "Extract Method",
    actionName: "scope_0",
    actionDescription: "Extract function into class 'Foo'",
    newContent:
`class Foo {
    someMethod(m: number) {
        this./*RENAME*/newFunction(m);
        var q = 10;
        return q;
    }

    private newFunction(m: number) {
        var x = m;
        x = x * 3;
        var y = 30;
        var z = y + x;
        console.log(z);
    }
}`
});
