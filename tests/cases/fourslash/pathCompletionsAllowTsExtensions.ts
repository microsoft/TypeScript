/// <reference path="fourslash.ts" />

// @moduleResolution: bundler
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: /project/foo.ts
//// export const foo = 0;

// @Filename: /project/main.ts
//// import {} from ".//**/"

// Extensionless by default
verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo"],
});

// .ts extension when allowImportingTsExtensions is true and setting is js...
verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo.ts"],
  preferences: {
    importModuleSpecifierEnding: "js",
  },
});

// ...or when another import uses .ts extension
edit.insert(`foo.ts"\nimport {} from "./`);
verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo.ts"],
});
