/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/packages/app/package.json
//// { "name": "app", "dependencies": { "dep": "*" } }

// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "outDir": "dist",
////     "rootDir": "src",
////     "baseUrl": ".",
////     "paths": {
////       "dep": ["../dep/src/main"],
////       "dep/dist/*": ["../dep/src/*"]
////     }
////   }
////   "references": [{ "path": "../dep" }]
//// }

// @Filename: /home/src/workspaces/project/packages/app/src/index.ts
//// dep1/*1*/;

// @Filename: /home/src/workspaces/project/packages/app/src/utils.ts
//// dep2/*2*/;

// @Filename: /home/src/workspaces/project/packages/app/src/a.ts
//// import "dep";


// @Filename: /home/src/workspaces/project/packages/dep/package.json
//// { "name": "dep", "main": "dist/main.js", "types": "dist/main.d.ts" }

// @Filename: /home/src/workspaces/project/packages/dep/tsconfig.json
//// {
////   "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
//// }

// @Filename: /home/src/workspaces/project/packages/dep/src/main.ts
//// import "./sub/folder";
//// export const dep1 = 0;

// @Filename: /home/src/workspaces/project/packages/dep/src/sub/folder/index.ts
//// export const dep2 = 0;


goTo.marker("1");
verify.importFixAtPosition([`import { dep1 } from "dep";\r
\r
dep1;`]);

goTo.marker("2");
verify.importFixAtPosition([`import { dep2 } from "dep/dist/sub/folder";\r
\r
dep2;`]);
