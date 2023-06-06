// @strict: true
// @noEmit: true
// @target: esnext
// @module: esnext

// repro from https://github.com/microsoft/TypeScript/issues/54551

declare const b: string | undefined

const c = b ?? await Promise.resolve("str").then(v => v)
const d = b ?? await Promise.resolve("str").then(null, v => "str")

export {}