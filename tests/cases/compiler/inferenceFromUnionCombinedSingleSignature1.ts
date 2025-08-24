// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58468

declare const fn: (() => void) | ((a: number) => void);

declare const x: number;
declare const y: any;

fn.call(null, x);
fn.call(null, y);

export {};
