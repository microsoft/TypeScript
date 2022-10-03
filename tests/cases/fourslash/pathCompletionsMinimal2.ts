/// <reference path="fourslash.ts" />

// @moduleResolution: minimal
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: /project/node_modules/@types/foo/index.d.ts
//// export const fromAtTypesFoo: number;

// @Filename: /project/node_modules/bar/index.d.ts
//// export const fromBar: number;

// @Filename: /project/local.ts
//// export const fromLocal: number;

// @Filename: /project/Component.tsx
//// export function Component() { return null; }

// @Filename: /project/main.ts
//// import {} from "/**/";

verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: []
});

edit.insert("./");

verify.completions({
  isNewIdentifierLocation: true,
  exact: ["Component.tsx", "local.ts"],
});
