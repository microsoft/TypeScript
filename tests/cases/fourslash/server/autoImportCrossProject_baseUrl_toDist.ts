/// <reference path="../fourslash.ts" />

// @Filename: /common/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "outDir": "dist",
////     "composite": true
////   },
////   "include": ["src"]
//// }

// @Filename: /common/src/MyModule.ts
//// export function square(n: number) {
////   return n * 2;
//// }

// @Filename: /web/tsconfig.json
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

// @Filename: /web/src/MyApp.ts
//// import { square } from "../../common/dist/src/MyModule";

// @Filename: /web/src/Helper.ts
//// export function saveMe() {
////   square/**/(2);
//// }

goTo.file("/web/src/Helper.ts");
verify.importFixModuleSpecifiers("", ["../../common/src/MyModule"], {
  importModuleSpecifierPreference: "non-relative"
});
