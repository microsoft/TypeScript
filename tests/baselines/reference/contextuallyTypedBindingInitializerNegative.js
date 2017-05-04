//// [contextuallyTypedBindingInitializerNegative.ts]
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


//// [contextuallyTypedBindingInitializerNegative.js]
function f(_a) {
    var _b = _a.show, showRename = _b === void 0 ? function (v) { return v; } : _b;
}
function f2(_a) {
    var _b = _a["show"], showRename = _b === void 0 ? function (v) { return v; } : _b;
}
function f3(_a) {
    var _b = _a["show"], showRename = _b === void 0 ? function (v) { return v; } : _b;
}
function ff(_a) {
    var _b = _a.nested, nestedRename = _b === void 0 ? { show: function (v) { return v; } } : _b;
}
var _a = { stringIdentity: function (x) { return x; } }.stringIdentity, id = _a === void 0 ? function (arg) { return arg.length; } : _a;
function g(_a) {
    var _b = _a.prop, prop = _b === void 0 ? [101, 1234] : _b;
}
function h(_a) {
    var _b = _a.prop, prop = _b === void 0 ? "baz" : _b;
}
