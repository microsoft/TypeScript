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



//// [predicateSemantics.js]
var _a, _b, _c, _d;
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
