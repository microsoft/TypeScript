// @module: esnext
// @moduleResolution: bundler
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /types.d.ts
export interface MyType { x: string }

// @Filename: /main.ts
type A = import("./types", { assert: { "resolution-mode": "import" } }).MyType;
type B = import("./types", { assert: { "resolution-mode": "require" } }).MyType;

const a = import("./types", { assert: { "resolution-mode": "import" } });
const b = import("./types", { assert: { "resolution-mode": "require" } });
