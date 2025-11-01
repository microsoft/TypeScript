/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/node_modules/common-dependency/package.json
//// { "name": "common-dependency" }

// @Filename: /home/src/workspaces/project/node_modules/common-dependency/index.d.ts
//// export declare class CommonDependency {}

// @Filename: /home/src/workspaces/project/node_modules/package-dependency/package.json
//// { "name": "package-dependency" }

// @Filename: /home/src/workspaces/project/node_modules/package-dependency/index.d.ts
//// export declare class PackageDependency

// @Filename: /home/src/workspaces/project/package.json
//// { "private": true, "dependencies": { "common-dependency": "*" } }

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "files": [], "references": [{ "path": "packages/a" }] }

// @Filename: /home/src/workspaces/project/packages/a/tsconfig.json
//// { "compilerOptions": { "target": "esnext", "composite": true } }

// @Filename: /home/src/workspaces/project/packages/a/package.json
//// { "peerDependencies": { "package-dependency": "*" } }

// @Filename: /home/src/workspaces/project/packages/a/index.ts
//// /**/

goTo.marker("");
verify.completions({
  includes: [{
    name: "PackageDependency",
    hasAction: true,
    source: "/home/src/workspaces/project/node_modules/package-dependency/index",
    sortText: completion.SortText.AutoImportSuggestions,
    isPackageJsonImport: true
  }, {
    name: "CommonDependency",
    hasAction: true,
    source: "/home/src/workspaces/project/node_modules/common-dependency/index",
    sortText: completion.SortText.AutoImportSuggestions,
    isPackageJsonImport: true
  }],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
