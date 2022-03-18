/// <reference path="fourslash.ts" />

// @Filename: /a/longer/project/path/than/typings/cache/location/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "allowJs": true, "checkJs": true, "maxNodeModuleJsDepth": 2 } }

// @Filename: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json
//// { "name": "@types/react-router-dom", "version": "16.8.4", "types": "index.d.ts" }

// @Filename: /Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
//// export class BrowserRouter {}

// @Filename: /a/longer/project/path/than/typings/cache/location/node_modules/react-router-dom/package.json
//// { "name": "react-router-dom", "version": "16.8.4", "main": "index.js" }

// @Filename: /a/longer/project/path/than/typings/cache/location/node_modules/react-router-dom/index.js
//// import "./BrowserRouter";
//// export {};

// @Filename: /a/longer/project/path/than/typings/cache/location/node_modules/react-router-dom/BrowserRouter.js
//// export const BrowserRouter = () => null;

// @Filename: /a/longer/project/path/than/typings/cache/location/index.js
////BrowserRouter/**/

verify.completions({
  marker: "",
  exact: completion.globalsInJsPlus([{
    name: "BrowserRouter",
    source: "react-router-dom",
    sourceDisplay: "react-router-dom",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }]),
  preferences: {
    allowIncompleteCompletions: true,
    includeCompletionsForModuleExports: true,
  }
});
