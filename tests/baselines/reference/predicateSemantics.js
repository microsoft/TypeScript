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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
// OK: One or other operand is possibly nullish
const test1 = (_a = (cond ? undefined : 32)) !== null && _a !== void 0 ? _a : "possibly reached";
// Not OK: Both operands nullish
const test2 = (_b = (cond ? undefined : null)) !== null && _b !== void 0 ? _b : "always reached";
// Not OK: Both operands non-nullish
const test3 = (_c = (cond ? 132 : 17)) !== null && _c !== void 0 ? _c : "unreachable";
// Parens
const test4 = (_d = (cond ? (undefined) : (17))) !== null && _d !== void 0 ? _d : 42;
// Should be OK (special case)
if (!!true) {
}
// Should be OK (special cases)
while (0) { }
while (1) { }
while (true) { }
while (false) { }
const p5 = (_e = {}) !== null && _e !== void 0 ? _e : null;
const p6 = (_f = 0 > 1) !== null && _f !== void 0 ? _f : null;
const p7 = null !== null && null !== void 0 ? null : null;
const p8 = (class foo {
}) && null;
const p9 = (class foo {
}) || null;
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
    const maybe = null;
    let i = 0;
    const d = (_g = (i++, maybe)) !== null && _g !== void 0 ? _g : true; // ok
    const e = (_h = (i++, i++)) !== null && _h !== void 0 ? _h : true; // error
    const f = (_j = (maybe, i++)) !== null && _j !== void 0 ? _j : true; // error
}
// https://github.com/microsoft/TypeScript/issues/60439
class X {
    constructor() {
        var _a;
        const p = (_a = new.target) !== null && _a !== void 0 ? _a : 32;
    }
}
(_k = tag `foo${1}`) !== null && _k !== void 0 ? _k : 32; // ok
(_l = `foo${1}`) !== null && _l !== void 0 ? _l : 32; // error
`foo` !== null && `foo` !== void 0 ? `foo` : 32; // error
