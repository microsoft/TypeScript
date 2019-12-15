// @emitExtension: .mjs

// @Filename: 0.ts
// For the deno case
export default 0

// @Filename: 1.ts
import num from './0.ts'
num + 1
