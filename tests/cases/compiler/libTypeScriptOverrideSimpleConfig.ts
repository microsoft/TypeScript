// @traceResolution: true
// @libReplacement: true

// @Filename: /somepath/node_modules/@typescript/lib-dom/index.d.ts
interface ABC { abc: string }
// @Filename: /somepath/tsconfig.json
{ }
// @Filename: /somepath/index.ts
/// <reference lib="dom" />
const a: ABC = { abc: "Hello" }

// This should fail because libdom has been replaced
// by the module above ^
window.localStorage
