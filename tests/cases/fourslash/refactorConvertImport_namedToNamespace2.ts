/// <reference path='fourslash.ts' />

////import foo, /*a*/{ a, b, c as d }/*b*/ from "./foo";
////a;
////b;
////d;
////foo;
////export default a;
////export { b };
////export { d };
////export { foo };


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    triggerReason: "invoked",
    newContent:
`import foo, * as foo_1 from "./foo";
import { b, c as d } from "./foo";
foo_1.a;
foo_1.b;
foo_1.c;
foo;
export default foo_1.a;
export { b };
export { d };
export { foo };`,
});
