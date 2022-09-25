// @Filename: /node_modules/@typescript/lib-dom/index.d.ts
// NOOP
// @Filename: /node_modules/@typescript/lib-dom/iterable.d.ts
interface DOMIterable { abc: string }
// @Filename: index.ts
/// <reference lib="dom.iterable" />
const a: DOMIterable = { abc: "Hello" }

// This should fail because libdom has been replaced
// by the module above ^
window.localStorage