// @emitExtension: .mjs

// @Filename: 0.ts
export default 0

// @Filename: 1.ts
import value from './0.mjs'
value + 1
