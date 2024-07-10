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

