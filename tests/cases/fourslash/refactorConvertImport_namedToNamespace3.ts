/// <reference path='fourslash.ts' />

/////*a*/import { a, b } from "./foo"/*b*/;
////a;
////b;
////function newScope() {
////    const foo = "foo";
////    foo;
////    return a;
////}
////newScope();


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    triggerReason: "invoked",
    newContent:
`import * as foo_1 from "./foo";
foo_1.a;
foo_1.b;
function newScope() {
    const foo = "foo";
    foo;
    return foo_1.a;
}
newScope();`,
});
