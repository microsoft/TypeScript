/// <reference path='fourslash.ts' />

/////*a*/import { "__<value>" as Value, "__<type>" as Type } from "foo";/*b*/
////export { Value, Type }; // Need a named import for this
////const foo: Type = Value;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to namespace import",
    actionDescription: "Convert named imports to namespace import",
    newContent:
`import * as foo_1 from "foo";
import { "__<value>" as Value, "__<type>" as Type } from "foo";
export { Value, Type }; // Need a named import for this
const foo: foo_1["__<type>"] = foo_1["__<value>"];`,
});
