/// <reference path="fourslash.ts" />

// @Filename: /project/foo.css
//// export const foo = 0;

// @Filename: declarations.d.ts
//// declare module "*.css" {}

// @Filename: /project/main.ts
//// import {} from ".//**/"

// Extensionless by default
verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["foo.css"],
});
