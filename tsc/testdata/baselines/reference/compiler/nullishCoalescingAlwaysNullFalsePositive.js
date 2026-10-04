//// [tests/cases/compiler/nullishCoalescingAlwaysNullFalsePositive.ts] ////

//// [nullishCoalescingAlwaysNullFalsePositive.ts]
// Repro for https://github.com/microsoft/TypeScript/issues/63642
// TS2871 false positive: conditional with ?? null in true branch

declare let a: unknown, b: unknown;
const p = (a ? b ?? null : null) ?? 0;

declare let x: string | null | undefined;
const q = (x ??= null) ?? 0;


//// [nullishCoalescingAlwaysNullFalsePositive.js]
"use strict";
// Repro for https://github.com/microsoft/TypeScript/issues/63642
// TS2871 false positive: conditional with ?? null in true branch
const p = (a ? b ?? null : null) ?? 0;
const q = (x ??= null) ?? 0;
