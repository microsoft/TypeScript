/// <reference path='fourslash.ts' />

/////*a*/import { a, b, foo } from "./foo";/*b*/
////a;
////b;
////foo;


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
`import * as foo from "./foo";
foo.a;
foo.b;
foo.foo;`,
});
