// @strict: true
// @target: esnext, es2020, es2015

let x: string | undefined;

let d: string | undefined;
d ?? (d = x ?? "x")
d.length;

let e: string | undefined;
e ??= x ?? "x"
e.length