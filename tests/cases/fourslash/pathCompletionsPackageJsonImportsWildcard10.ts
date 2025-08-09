/// <reference path="fourslash.ts" />

// @module: preserve
// @moduleResolution: bundler
// @allowImportingTsExtensions: true
// @jsx: react

// @Filename: /package.json
//// {
////   "name": "repo",
////   "imports": {
////     "#*": "./src/*"
////   }
//// }

// @Filename: /src/card.tsx
//// export {};

// @Filename: /main.ts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#card.tsx", kind: "script", kindModifiers: ".tsx" },
  ],
});
