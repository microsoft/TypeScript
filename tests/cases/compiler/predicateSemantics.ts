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
