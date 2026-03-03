// @module: esnext
// @moduleResolution: bundler
// @ignoreDeprecations: 6.0
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /types.d.ts
export interface MyType { x: string }

// @Filename: /main.ts
// With ignoreDeprecations: "6.0", import type assertions should not produce a deprecation error.
type A = import("./types", { assert: { "resolution-mode": "import" } }).MyType;
type B = import("./types", { assert: { "resolution-mode": "require" } }).MyType;

const a = import("./types", { assert: { "resolution-mode": "import" } });
const b = import("./types", { assert: { "resolution-mode": "require" } });
