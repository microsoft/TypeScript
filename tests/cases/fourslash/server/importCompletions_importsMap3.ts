/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "type": "module",
////   "imports": {
////     "#internal/": "./dist/internal/"
////   }
//// }

// @Filename: /home/src/workspaces/project/src/internal/foo.ts
//// export function something(name: string) {}

// @Filename: /home/src/workspaces/project/src/a.ts
//// import {} from "/*1*/";
//// import {} from "#internal//*2*/";

verify.completions({
    marker: ["1"],
    exact: ["#internal"],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: ["2"],
    exact: ["foo.js"],
    isNewIdentifierLocation: true,
});
