/// <reference path='fourslash.ts' />

//// interface A {
////     [k: string]: number
//// }
//// declare const foo: A
//// call(/*a*/foo/*b*/[0], foo[1])

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `interface A {
    [k: string]: number
}
declare const foo: A
const { 0: index_0, 1: index_1 } = foo
call(index_0, index_1)`,
});
