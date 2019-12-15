// @noImplicitExtensionName: true
// @emitExtension: .mjs

// @Filename: 0.ts
export default 0

// @Filename: 1.ts
import num from './0.mjs'
// should be error
import num2 from './0'
num + num2
