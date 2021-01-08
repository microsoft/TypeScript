/// <reference path='fourslash.ts' />

//// interface I { foo: string; bar: number }
//// declare const a: I
//// console.log(/*a*/a/*b*/.foo, a.bar, a.foo, a.bar)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `interface I { foo: string; bar: number }
declare const a: I
const { foo, bar } = a
console.log(foo, bar, foo, bar)`,
});
