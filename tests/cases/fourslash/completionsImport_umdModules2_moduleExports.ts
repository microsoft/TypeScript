/// <reference path="./fourslash.ts" />

// @filename: /package.json
//// { "dependencies": { "@types/classnames": "*" } }

// @filename: /tsconfig.json
//// {}

// @filename: /node_modules/@types/classnames/package.json
//// { "name": "@types/classnames", "types": "index.d.ts" }

// @filename: /node_modules/@types/classnames/index.d.ts
//// declare const classNames: () => string;
//// export = classNames;
//// export as namespace classNames;

// @filename: /SomeReactComponent.tsx
//// import * as React from 'react';
////
//// const el1 = <div className={class/*1*/}>foo</div>;

goTo.marker("1");

verify.completions({
  includes: [{
    name: "classNames",
    hasAction: true,
    source: "/node_modules/@types/classnames/index",
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
      includeCompletionsForModuleExports: true,
  }
});
