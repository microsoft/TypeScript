// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55340

declare const a: Array<number | string>;
const b: Array<number> = [...a, 1];
