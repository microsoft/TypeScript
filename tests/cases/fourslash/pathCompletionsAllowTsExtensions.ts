/// <reference path="fourslash.ts" />

// @moduleResolution: hybrid
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: /project/foo.ts
//// export const foo = 0;

// @Filename: /project/main.ts
//// import {} from ".//**/"

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo"],
});

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo.ts"],
  preferences: {
    importModuleSpecifierEnding: "js",
  },
});

edit.insert(`foo.ts"\nimport {} from "./`);

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo.ts"],
});
