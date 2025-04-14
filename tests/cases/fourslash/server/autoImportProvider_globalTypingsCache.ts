/// <reference path="../fourslash.ts" />

// @Filename: /home/src/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json
//// { "name": "@types/react-router-dom", "version": "16.8.4", "types": "index.d.ts" }

// @Filename: /home/src/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
//// export class BrowserRouterFromDts {}

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "react-router-dom": "*" } }

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "allowJs": true, "checkJs": true, "maxNodeModuleJsDepth": 2 }, "typeAcquisition": { "enable": true } }

// @Filename: /home/src/workspaces/project/node_modules/react-router-dom/package.json
//// { "name": "react-router-dom", "version": "16.8.4", "main": "index.js" }

// @Filename: /home/src/workspaces/project/node_modules/react-router-dom/index.js
//// import "./BrowserRouter";
//// export {};

// @Filename: /home/src/workspaces/project/node_modules/react-router-dom/BrowserRouter.js
//// export const BrowserRouterFromJs = () => null;

// @Filename: /home/src/workspaces/project/index.js
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
