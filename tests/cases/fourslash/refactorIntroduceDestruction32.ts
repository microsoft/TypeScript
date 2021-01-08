/// <reference path='fourslash.ts' />

//// interface A {
////     [k: string]: number
//// }
//// declare const foo: A
//// call(/*a*/foo/*b*/[0], foo[1])

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `interface A {
    [k: string]: number
}
declare const foo: A
const { 0: index_0, 1: index_1 } = foo
call(index_0, index_1)`,
});
