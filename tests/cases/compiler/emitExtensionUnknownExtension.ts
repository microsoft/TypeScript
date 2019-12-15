// @emitExtension: .mjs

// @Filename: 0.ts
export default 0

// @Filename: 1.ts
import num from './0.cjs'
num + 1
