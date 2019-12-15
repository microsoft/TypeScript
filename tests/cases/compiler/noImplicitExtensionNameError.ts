// @noImplicitExtensionName: true

// @Filename: 0.ts
export default 0

// @Filename: 1.ts
// Should be error
import num from './0'
// Should be okay
import num2 from './0.js'
num + num2
