//// [tests/cases/conformance/types/contextualTypes/methodDeclarations/contextuallyTypedBindingInitializer.ts] ////

//// [contextuallyTypedBindingInitializer.ts]
interface Show {
    show: (x: number) => string;
}
function f({ show = v => v.toString() }: Show) {}
function f2({ "show": showRename = v => v.toString() }: Show) {}
function f3({ ["show"]: showRename = v => v.toString() }: Show) {}

interface Nested {
    nested: Show
}
function ff({ nested = { show: v => v.toString() } }: Nested) {}

interface Tuples {
    prop: [string, number];
}
function g({ prop = ["hello", 1234] }: Tuples) {}

interface StringUnion {
    prop: "foo" | "bar";
}
function h({ prop = "foo" }: StringUnion) {}

interface StringIdentity {
    stringIdentity(s: string): string;
}
let { stringIdentity: id = arg => arg }: StringIdentity = { stringIdentity: x => x};




//// [contextuallyTypedBindingInitializer.js]
function f({ show = v => v.toString() }) { }
function f2({ "show": showRename = v => v.toString() }) { }
function f3({ ["show"]: showRename = v => v.toString() }) { }
function ff({ nested = { show: v => v.toString() } }) { }
function g({ prop = ["hello", 1234] }) { }
function h({ prop = "foo" }) { }
let { stringIdentity: id = arg => arg } = { stringIdentity: x => x };
