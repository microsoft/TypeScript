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
////     "paths": {
////       "@common/*": ["../common/dist/src/*"]
////     }
////   },
////   "include": ["src"],
////   "references": [{ "path": "../common" }]
//// }

// @Filename: /web/src/MyApp.ts
//// import { square } from "@common/MyModule";

// @Filename: /web/src/Helper.ts
//// export function saveMe() {
////   square/**/(2);
//// }

goTo.file("/web/src/Helper.ts");
verify.importFixModuleSpecifiers("", ["@common/MyModule"], {
  importModuleSpecifierPreference: "non-relative"
});
