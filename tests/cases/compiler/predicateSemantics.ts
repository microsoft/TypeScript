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
