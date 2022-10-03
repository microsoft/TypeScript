/// <reference path='fourslash.ts' />

// @strict: true

////interface Foo {
////    bar:{
////        baz: string;
////    }
////}
////declare let foo: Foo;
/////*a*/foo && foo.bar ? foo.bar.baz : "whenFalse";/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`interface Foo {
    bar:{
        baz: string;
    }
}
declare let foo: Foo;
foo?.bar?.baz ?? "whenFalse";`
});