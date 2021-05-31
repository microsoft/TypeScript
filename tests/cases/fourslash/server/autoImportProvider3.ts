/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/common-dependency/package.json
//// { "name": "common-dependency" }

// @Filename: /node_modules/common-dependency/index.d.ts
//// export declare class CommonDependency {}

// @Filename: /node_modules/package-dependency/package.json
//// { "name": "package-dependency" }

// @Filename: /node_modules/package-dependency/index.d.ts
//// export declare class PackageDependency

// @Filename: /package.json
//// { "private": true, "dependencies": { "common-dependency": "*" } }

// @Filename: /tsconfig.json
//// { "files": [], "references": [{ "path": "packages/a" }] }

// @Filename: /packages/a/tsconfig.json
//// { "compilerOptions": { "target": "esnext", "composite": true } }

// @Filename: /packages/a/package.json
//// { "peerDependencies": { "package-dependency": "*" } }

// @Filename: /packages/a/index.ts
//// /**/

goTo.marker("");
verify.completions({
  includes: [{
    name: "PackageDependency",
    hasAction: true,
    source: "/node_modules/package-dependency/index",
    sortText: completion.SortText.AutoImportSuggestions,
    isPackageJsonImport: true
  }, {
    name: "CommonDependency",
    hasAction: true,
    source: "/node_modules/common-dependency/index",
    sortText: completion.SortText.AutoImportSuggestions,
    isPackageJsonImport: true
  }],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
