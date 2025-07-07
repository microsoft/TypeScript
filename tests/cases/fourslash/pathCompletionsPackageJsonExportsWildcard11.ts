/// <reference path="fourslash.ts" />

// @module: preserve
// @moduleResolution: bundler
// @jsx: react

// @Filename: /node_modules/repo/package.json
//// {
////   "name": "repo",
////   "exports": {
////     "./*": "./src/*"
////   }
//// }

// @Filename: /node_modules/repo/src/card.tsx
//// export {};

// @Filename: /main.ts
//// import { } from "repo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "card.js", kind: "script", kindModifiers: ".js" },
  ],
});
