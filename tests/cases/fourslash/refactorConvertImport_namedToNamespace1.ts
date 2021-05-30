/// <reference path='fourslash.ts' />

/////*a*/import { Foo } from "./Foo";/*b*/
////Foo;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
`import * as Foo from "./Foo";
Foo.Foo;`,
});
