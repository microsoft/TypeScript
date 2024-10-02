// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60119

interface T {
  a?: unknown;
  b?: unknown;
  c?: unknown;
}

function f1<L extends keyof T>(k: L, t: T | undefined) {
  const { [k]: v } = t;
}

function f2<L extends keyof T>(k: L, t: T | null) {
  const { [k]: v } = t;
}

function f3<L extends keyof T>(k: L, t: T | null | undefined) {
  const { [k]: v } = t;
}
