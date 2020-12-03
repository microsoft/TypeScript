/// <reference path='fourslash.ts' />

////interface Foo {
////    bar?:{
////        baz?: string;
////    }
////}
////declare let foo: Foo | undefined;
/////*a*/foo && foo.bar && foo.bar.baz;/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`interface Foo {
    bar?:{
        baz?: string;
    }
}
declare let foo: Foo | undefined;
foo?.bar?.baz;`
});