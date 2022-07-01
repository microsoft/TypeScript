/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "target": "ESNext",
////     "module": "Node16",
////     "moduleResolution": "Node16",
////     "rootDir": "./src",
////     "outDir": "./dist",
////     "paths": {
////       "#internals/*": ["./src/internals/*.ts"]
////     }
////   },
////   "include": ["src"]
//// }

// @Filename: /src/internals/example.ts
//// export function helloWorld() {}

// @Filename: /src/index.ts
//// helloWorld/**/

verify.importFixModuleSpecifiers("", ["#internals/example"], { importModuleSpecifierEnding: "js" });
