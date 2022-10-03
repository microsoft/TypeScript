/// <reference path='fourslash.ts' />

/////*a*/import { a, b, foo } from "./foo";/*b*/
////a;
////b;
////foo;
////export { foo };
////export { foo as bar };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    triggerReason: "invoked",
    newContent:
`import * as foo_1 from "./foo";
import { foo } from "./foo";
foo_1.a;
foo_1.b;
foo_1.foo;
export { foo };
export { foo as bar };`,
});
