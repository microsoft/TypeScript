// @noImplicitAny: true
interface Show {
    show: (x: number) => string;
}
function f({ show: showRename = v => v }: Show) {}
function f2({ "show": showRename = v => v }: Show) {}
function f3({ ["show"]: showRename = v => v }: Show) {}

interface Nested {
    nested: Show
}
function ff({ nested: nestedRename = { show: v => v } }: Nested) {}

interface StringIdentity {
    stringIdentity(s: string): string;
}
let { stringIdentity: id = arg => arg.length }: StringIdentity = { stringIdentity: x => x};

interface Tuples {
    prop: [string, number];
}
function g({ prop = [101, 1234] }: Tuples) {}

interface StringUnion {
    prop: "foo" | "bar";
}
function h({ prop = "baz" }: StringUnion) {}
