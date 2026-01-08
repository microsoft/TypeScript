// @traceResolution: true
// @libReplacement: true

// @Filename: /node_modules/@typescript/lib-dom/index.d.ts
interface ABC { abc: string }
// @Filename: index.ts
/// <reference lib="dom" />
const a: ABC = { abc: "Hello" }

// This should fail because libdom has been replaced
// by the module above ^
window.localStorage
