//// [tests/cases/compiler/predicateSemantics.ts] ////

//// [predicateSemantics.ts]
declare let cond: any;

// OK: One or other operand is possibly nullish
const test1 = (cond ? undefined : 32) ?? "possibly reached";

// Not OK: Both operands nullish
const test2 = (cond ? undefined : null) ?? "always reached";

// Not OK: Both operands non-nullish
const test3 = (cond ? 132 : 17) ?? "unreachable";

// Parens
const test4 = (cond ? (undefined) : (17)) ?? 42;

// Should be OK (special case)
if (!!true) {

}

// Should be OK (special cases)
while (0) { }
while (1) { }
while (true) { }
while (false) { }

const p5 = {} ?? null;
const p6 = 0 > 1 ?? null;
const p7 = null ?? null;
const p8 = (class foo { }) && null;
const p9 = (class foo { }) || null;

// Outer expression tests
while ({} as any) { }
while ({} satisfies unknown) { }
while ((<any>({}))) { }
while ((({}))) { }


//// [predicateSemantics.js]
var _a, _b, _c, _d, _e, _f;
// OK: One or other operand is possibly nullish
var test1 = (_a = (cond ? undefined : 32)) !== null && _a !== void 0 ? _a : "possibly reached";
// Not OK: Both operands nullish
var test2 = (_b = (cond ? undefined : null)) !== null && _b !== void 0 ? _b : "always reached";
// Not OK: Both operands non-nullish
var test3 = (_c = (cond ? 132 : 17)) !== null && _c !== void 0 ? _c : "unreachable";
// Parens
var test4 = (_d = (cond ? (undefined) : (17))) !== null && _d !== void 0 ? _d : 42;
// Should be OK (special case)
if (!!true) {
}
// Should be OK (special cases)
while (0) { }
while (1) { }
while (true) { }
while (false) { }
var p5 = (_e = {}) !== null && _e !== void 0 ? _e : null;
var p6 = (_f = 0 > 1) !== null && _f !== void 0 ? _f : null;
var p7 = null !== null && null !== void 0 ? null : null;
var p8 = (/** @class */ (function () {
    function foo() {
    }
    return foo;
}())) && null;
var p9 = (/** @class */ (function () {
    function foo() {
    }
    return foo;
}())) || null;
// Outer expression tests
while ({}) { }
while ({}) { }
while (({})) { }
while ((({}))) { }
