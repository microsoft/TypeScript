/// <reference path="fourslash.ts" />

// @Filename: /package.json
//// {
////   "typesVersions": {
////     "*": {
////       "*": ["./src/*"]
////     }
////   }
//// }

// @Filename: /src/add.ts
//// export function add(a: number, b: number) { return a + b; }

// @Filename: /src/index.ts
//// import { add } from ".//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: ["add"],
});
