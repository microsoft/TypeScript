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

// positive numbers
while (+2) {}
while (+0.000) {}

// Not OK; always truthy.
if (1n) { }

// Not OK; always falsy.
if (0n) { } 
// Not OK; always falsy.
if (-0n) { }

// negative numbers
// not OK - truthy
if (-1.2) { }
// not OK - falsy
if (-0.0000){}
if (+0){}
// not OK - falsy
if (-0n){}
// not OK - truthy
if (-13n){}

// not ok - just a truthy number
if (-1){}
if (+1){}

declare const identifier: any;
// OK
if (-identifier) {}

//// [predicateSemantics.js]
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
    return this ?? 0;
}
// positive numbers
while (+2) { }
while (+0.000) { }
// Not OK; always truthy.
if (1n) { }
// Not OK; always falsy.
if (0n) { }
// Not OK; always falsy.
if (-0n) { }
// negative numbers
// not OK - truthy
if (-1.2) { }
// not OK - falsy
if (-0.0000) { }
if (+0) { }
// not OK - falsy
if (-0n) { }
// not OK - truthy
if (-13n) { }
// not ok - just a truthy number
if (-1) { }
if (+1) { }
// OK
if (-identifier) { }
