// @strict: true
// @verbatimModuleSyntax: true,false
// @noUncheckedSideEffectImports: true,false
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/tsc/issues/1190

// @filename: /types.d.ts
export type MyType = { foo: string; };

// @filename: /index.ts
import "./types.d.ts";
