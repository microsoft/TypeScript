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

const p10 = opt ?? null ?? 1;
const p11 = opt ?? null ?? null;
const p12 = opt ?? (null ?? 1);
const p13 = opt ?? (null ?? null);
const p14 = opt ?? (null ?? null ?? null);

const p20 = null ?? (opt ? null : undefined) ?? null;
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


//// [predicateSemantics.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
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
var p10 = (_h = opt !== null && opt !== void 0 ? opt : null) !== null && _h !== void 0 ? _h : 1;
var p11 = (_j = opt !== null && opt !== void 0 ? opt : null) !== null && _j !== void 0 ? _j : null;
var p12 = opt !== null && opt !== void 0 ? opt : (null !== null && null !== void 0 ? null : 1);
var p13 = opt !== null && opt !== void 0 ? opt : (null !== null && null !== void 0 ? null : null);
var p14 = opt !== null && opt !== void 0 ? opt : ((_k = null !== null && null !== void 0 ? null : null) !== null && _k !== void 0 ? _k : null);
var p20 = (_l = null !== null && null !== void 0 ? null : (opt ? null : undefined)) !== null && _l !== void 0 ? _l : null;
var p21 = (_o = (_m = null !== null && null !== void 0 ? null : null) !== null && _m !== void 0 ? _m : null) !== null && _o !== void 0 ? _o : null;
var p22 = (_p = null !== null && null !== void 0 ? null : 1) !== null && _p !== void 0 ? _p : 1;
var p23 = (_q = null !== null && null !== void 0 ? null : (opt ? 1 : 2)) !== null && _q !== void 0 ? _q : 1;
// Outer expression tests
while ({}) { }
while ({}) { }
while (({})) { }
while ((({}))) { }
// Should be OK
console.log((cond || undefined) && 1 / cond);
