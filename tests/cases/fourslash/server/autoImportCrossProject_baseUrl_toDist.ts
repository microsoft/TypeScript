/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/common/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "outDir": "dist",
////     "composite": true
////   },
////   "include": ["src"]
//// }

// @Filename: /home/src/workspaces/project/common/src/MyModule.ts
//// export function square(n: number) {
////   return n * 2;
//// }

// @Filename: /home/src/workspaces/project/web/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "esnext",
////     "moduleResolution": "node",
////     "noEmit": true,
////     "baseUrl": "."
////   },
////   "include": ["src"],
////   "references": [{ "path": "../common" }]
//// }

// @Filename: /home/src/workspaces/project/web/src/MyApp.ts
//// import { square } from "../../common/dist/src/MyModule";

// @Filename: /home/src/workspaces/project/web/src/Helper.ts
//// export function saveMe() {
////   square/**/(2);
//// }

goTo.file("/home/src/workspaces/project/web/src/Helper.ts");
verify.importFixModuleSpecifiers("", ["../../common/src/MyModule"], {
  importModuleSpecifierPreference: "non-relative"
});
