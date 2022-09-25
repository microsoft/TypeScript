/// <reference path="fourslash.ts" />

// @module: commonjs
// @esModuleInterop: true

// @Filename: /node_modules/@scope/react-dom/package.json
//// { "name": "react-dom", "version": "1.0.0", "types": "./index.d.ts" }

// @Filename: /node_modules/@scope/react-dom/index.d.ts
//// import * as React from "react";
//// export function render(): void;

// @Filename: /node_modules/@scope/react/package.json
//// { "name": "react", "version": "1.0.0", "types": "./index.d.ts" }

// @Filename: /node_modules/@scope/react/index.d.ts
//// import "./other";
//// export declare function useState(): void;

// @Filename: /node_modules/@scope/react/other.d.ts
//// export declare function useRef(): void;

// @Filename: /packages/a/node_modules/@scope/react/package.json
//// { "name": "react", "version": "1.0.1", "types": "./index.d.ts" }

// @Filename: /packages/a/node_modules/@scope/react/index.d.ts
//// export declare function useState(): void;

// @Filename: /packages/a/index.ts
//// import "@scope/react-dom";
//// import "@scope/react";

// @Filename: /packages/a/foo.ts
//// /**/

goTo.marker("");
verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "render",
    source: "@scope/react-dom",
    sourceDisplay: "@scope/react-dom",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }, {
    name: "useState",
    source: "@scope/react",
    sourceDisplay: "@scope/react",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});
