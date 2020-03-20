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
function f(_b) {
    var _c = _b.show, showRename = _c === void 0 ? function (v) { return v; } : _c;
}
function f2(_d) {
    var _e = _d["show"], showRename = _e === void 0 ? function (v) { return v; } : _e;
}
function f3(_f) {
    var _g = _f["show"], showRename = _g === void 0 ? function (v) { return v; } : _g;
}
function ff(_h) {
    var _j = _h.nested, nestedRename = _j === void 0 ? { show: function (v) { return v; } } : _j;
}
var _a = { stringIdentity: function (x) { return x; } }.stringIdentity, id = _a === void 0 ? function (arg) { return arg.length; } : _a;
function g(_k) {
    var _l = _k.prop, prop = _l === void 0 ? [101, 1234] : _l;
}
function h(_m) {
    var _o = _m.prop, prop = _o === void 0 ? "baz" : _o;
}
