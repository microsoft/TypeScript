/// <reference path="../fourslash.ts" />

// @Filename: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json
//// { "name": "@types/react-router-dom", "version": "16.8.4", "types": "index.d.ts" }

// @Filename: /Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
//// export class BrowserRouterFromDts {}

// @Filename: /project/package.json
//// { "dependencies": { "react-router-dom": "*" } }

// @Filename: /project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "allowJs": true, "checkJs": true, "maxNodeModuleJsDepth": 2 }, "typeAcquisition": { "enable": true } }

// @Filename: /project/node_modules/react-router-dom/package.json
//// { "name": "react-router-dom", "version": "16.8.4", "main": "index.js" }

// @Filename: /project/node_modules/react-router-dom/index.js
//// import "./BrowserRouter";
//// export {};

// @Filename: /project/node_modules/react-router-dom/BrowserRouter.js
//// export const BrowserRouterFromJs = () => null;

// @Filename: /project/index.js
////BrowserRouter/**/

verify.completions({
  marker: "",
  exact: completion.globalsInJsPlus([{
    name: "BrowserRouterFromDts",
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
