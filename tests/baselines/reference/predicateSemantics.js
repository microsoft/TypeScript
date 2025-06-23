//// [tests/cases/compiler/predicateSemantics.ts] ////

//// [predicateSemantics.ts]
declare let opt: number | undefined;

// OK: One or other operand is possibly nullish
const test1 = (opt ? undefined : 32) ?? "possibly reached";

// Not OK: Both operands nullish
const test2 = (opt ? undefined : null) ?? "always reached";

// Not OK: Both operands non-nullish
const test3 = (opt ? 132 : 17) ?? "unreachable";

// Parens
const test4 = (opt ? (undefined) : (17)) ?? 42;

// Should be OK (special case)
if (!!true) {

}

// Should be OK (special cases)
while (0) { }
while (1) { }
while (true) { }
while (false) { }

const p01 = {} ?? null;
const p02 = 0 > 1 ?? null;
const p03 = null ?? 1;
const p04 = null ?? null;
const p05 = (class foo { }) && null;
const p06 = (class foo { }) || null;
const p07 = null ?? null ?? null;
const p08 = null ?? opt ?? null;
const p09 = null ?? (opt ? null : undefined) ?? null;

const p10 = opt ?? null ?? 1;
const p11 = opt ?? null ?? null;
const p12 = opt ?? (null ?? 1);
const p13 = opt ?? (null ?? null);
const p14 = opt ?? (null ?? null ?? null);
const p15 = opt ?? (opt ? null : undefined) ?? null;
const p16 = opt ?? 1 ?? 2;
const p17 = opt ?? (opt ? 1 : 2) ?? 3;

const p21 = null ?? null ?? null ?? null;
const p22 = null ?? 1 ?? 1;
const p23 = null ?? (opt ? 1 : 2) ?? 1;

// Outer expression tests
while ({} as any) { }
while ({} satisfies unknown) { }
while ((<any>({}))) { }
while ((({}))) { }

declare let cond: any;

// Should be OK
console.log((cond || undefined) && 1 / cond);

function foo(this: Object | undefined) {
    // Should be OK
    return this ?? 0;
}

// https://github.com/microsoft/TypeScript/issues/60401
{
  const maybe = null as true | null;
  let i = 0;
  const d = (i++, maybe) ?? true; // ok
  const e = (i++, i++) ?? true; // error
  const f = (maybe, i++) ?? true; // error
}

// https://github.com/microsoft/TypeScript/issues/60439
class X {
  constructor() {
    const p = new.target ?? 32;
  }
}

// https://github.com/microsoft/TypeScript/issues/60614
declare function tag<T>(
  strings: TemplateStringsArray,
  ...values: number[]
): T | null;

tag`foo${1}` ?? 32; // ok

`foo${1}` ?? 32; // error
`foo` ?? 32; // error


//// [predicateSemantics.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
// OK: One or other operand is possibly nullish
var test1 = (_a = (opt ? undefined : 32)) !== null && _a !== void 0 ? _a : "possibly reached";
// Not OK: Both operands nullish
var test2 = (_b = (opt ? undefined : null)) !== null && _b !== void 0 ? _b : "always reached";
// Not OK: Both operands non-nullish
var test3 = (_c = (opt ? 132 : 17)) !== null && _c !== void 0 ? _c : "unreachable";
// Parens
var test4 = (_d = (opt ? (undefined) : (17))) !== null && _d !== void 0 ? _d : 42;
// Should be OK (special case)
if (!!true) {
}
// Should be OK (special cases)
while (0) { }
while (1) { }
while (true) { }
while (false) { }
var p01 = (_e = {}) !== null && _e !== void 0 ? _e : null;
var p02 = (_f = 0 > 1) !== null && _f !== void 0 ? _f : null;
var p03 = null !== null && null !== void 0 ? null : 1;
var p04 = null !== null && null !== void 0 ? null : null;
var p05 = (/** @class */ (function () {
    function foo() {
    }
    return foo;
}())) && null;
var p06 = (/** @class */ (function () {
    function foo() {
    }
    return foo;
}())) || null;
var p07 = (_g = null !== null && null !== void 0 ? null : null) !== null && _g !== void 0 ? _g : null;
var p08 = (_h = null !== null && null !== void 0 ? null : opt) !== null && _h !== void 0 ? _h : null;
var p09 = (_j = null !== null && null !== void 0 ? null : (opt ? null : undefined)) !== null && _j !== void 0 ? _j : null;
var p10 = (_k = opt !== null && opt !== void 0 ? opt : null) !== null && _k !== void 0 ? _k : 1;
var p11 = (_l = opt !== null && opt !== void 0 ? opt : null) !== null && _l !== void 0 ? _l : null;
var p12 = opt !== null && opt !== void 0 ? opt : (null !== null && null !== void 0 ? null : 1);
var p13 = opt !== null && opt !== void 0 ? opt : (null !== null && null !== void 0 ? null : null);
var p14 = opt !== null && opt !== void 0 ? opt : ((_m = null !== null && null !== void 0 ? null : null) !== null && _m !== void 0 ? _m : null);
var p15 = (_o = opt !== null && opt !== void 0 ? opt : (opt ? null : undefined)) !== null && _o !== void 0 ? _o : null;
var p16 = (_p = opt !== null && opt !== void 0 ? opt : 1) !== null && _p !== void 0 ? _p : 2;
var p17 = (_q = opt !== null && opt !== void 0 ? opt : (opt ? 1 : 2)) !== null && _q !== void 0 ? _q : 3;
var p21 = (_s = (_r = null !== null && null !== void 0 ? null : null) !== null && _r !== void 0 ? _r : null) !== null && _s !== void 0 ? _s : null;
var p22 = (_t = null !== null && null !== void 0 ? null : 1) !== null && _t !== void 0 ? _t : 1;
var p23 = (_u = null !== null && null !== void 0 ? null : (opt ? 1 : 2)) !== null && _u !== void 0 ? _u : 1;
// Outer expression tests
while ({}) { }
while ({}) { }
while (({})) { }
while ((({}))) { }
// Should be OK
console.log((cond || undefined) && 1 / cond);
function foo() {
    // Should be OK
    return this !== null && this !== void 0 ? this : 0;
}
// https://github.com/microsoft/TypeScript/issues/60401
{
    var maybe = null;
    var i = 0;
    var d = (_v = (i++, maybe)) !== null && _v !== void 0 ? _v : true; // ok
    var e = (_w = (i++, i++)) !== null && _w !== void 0 ? _w : true; // error
    var f = (_x = (maybe, i++)) !== null && _x !== void 0 ? _x : true; // error
}
// https://github.com/microsoft/TypeScript/issues/60439
var X = /** @class */ (function () {
    function X() {
        var _newTarget = this.constructor;
        var _a;
        var p = (_a = _newTarget) !== null && _a !== void 0 ? _a : 32;
    }
    return X;
}());
(_y = tag(__makeTemplateObject(["foo", ""], ["foo", ""]), 1)) !== null && _y !== void 0 ? _y : 32; // ok
(_z = "foo".concat(1)) !== null && _z !== void 0 ? _z : 32; // error
"foo" !== null && "foo" !== void 0 ? "foo" : 32; // error
