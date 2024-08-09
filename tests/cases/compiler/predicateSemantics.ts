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
