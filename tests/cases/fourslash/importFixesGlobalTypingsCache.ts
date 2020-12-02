/// <reference path="fourslash.ts" />

// @Filename: /project/tsconfig.json
//// { "compilerOptions": { "allowJs": true, "checkJs": true } }

// @Filename: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json
//// { "name": "react-router-dom" }

// @Filename: /Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
////export class BrowserRouter {}

// @Filename: /project/index.js
////BrowserRouter/**/

goTo.file("/project/index.js");
verify.importFixAtPosition([`const { BrowserRouter } = require("react-router-dom");

BrowserRouter`]);
