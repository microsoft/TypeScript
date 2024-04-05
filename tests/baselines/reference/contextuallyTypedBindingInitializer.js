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
function f(_a) {
    var _b = _a.show, show = _b === void 0 ? function (v) { return v.toString(); } : _b;
}
function f2(_a) {
    var _b = _a["show"], showRename = _b === void 0 ? function (v) { return v.toString(); } : _b;
}
function f3(_a) {
    var _b = _a["show"], showRename = _b === void 0 ? function (v) { return v.toString(); } : _b;
}
function ff(_a) {
    var _b = _a.nested, nested = _b === void 0 ? { show: function (v) { return v.toString(); } } : _b;
}
function g(_a) {
    var _b = _a.prop, prop = _b === void 0 ? ["hello", 1234] : _b;
}
function h(_a) {
    var _b = _a.prop, prop = _b === void 0 ? "foo" : _b;
}
var _a = { stringIdentity: function (x) { return x; } }.stringIdentity, id = _a === void 0 ? function (arg) { return arg; } : _a;
