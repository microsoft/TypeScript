globalThis.globalThis = 1 as any // should error
var x = 1
const y = 2
globalThis.x = 3
globalThis.y = 4 // should error
