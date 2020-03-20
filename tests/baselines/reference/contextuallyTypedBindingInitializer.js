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
function f(_b) {
    var _c = _b.show, show = _c === void 0 ? function (v) { return v.toString(); } : _c;
}
function f2(_d) {
    var _e = _d["show"], showRename = _e === void 0 ? function (v) { return v.toString(); } : _e;
}
function f3(_f) {
    var _g = _f["show"], showRename = _g === void 0 ? function (v) { return v.toString(); } : _g;
}
function ff(_h) {
    var _j = _h.nested, nested = _j === void 0 ? { show: function (v) { return v.toString(); } } : _j;
}
function g(_k) {
    var _l = _k.prop, prop = _l === void 0 ? ["hello", 1234] : _l;
}
function h(_m) {
    var _o = _m.prop, prop = _o === void 0 ? "foo" : _o;
}
var _a = { stringIdentity: function (x) { return x; } }.stringIdentity, id = _a === void 0 ? function (arg) { return arg; } : _a;
