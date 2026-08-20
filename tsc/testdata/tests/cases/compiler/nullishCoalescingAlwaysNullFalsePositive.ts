// @strict: true

// Repro for https://github.com/microsoft/TypeScript/issues/63642
// TS2871 false positive: conditional with ?? null in true branch

declare let a: unknown, b: unknown;
const p = (a ? b ?? null : null) ?? 0;

declare let x: string | null | undefined;
const q = (x ??= null) ?? 0;
