// @target: esnext
// @module: esnext

// @filename: fileA.ts
export {}
const foo = await { bar: 42 }

// @filename: fileB.ts
export const baz = await { x: 1, y: "hello" }
