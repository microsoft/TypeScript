/// <reference path='fourslash.ts' />

/////*a*/import { a, b, c as d } from "./foo"/*b*/;
////a;
////b;
////d;
////export default a;
////export { b };
////export { d };
////export { d as e };
////export { b as f };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    triggerReason: "invoked",
    newContent:
`import * as foo from "./foo";
import { b, c as d } from "./foo";
foo.a;
foo.b;
foo.c;
export default foo.a;
export { b };
export { d };
export { d as e };
export { b as f };`,
});
