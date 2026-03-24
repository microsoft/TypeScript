/// <reference path="fourslash.ts" />

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "amd",
////         "moduleResolution": "node",
////         "rootDir": "ts",
////         "baseUrl": ".",
////         "paths": {
////             "*": ["node_modules/@woltlab/wcf/ts/*"]
////         }
////     },
////     "include": [
////         "ts",
////         "node_modules/@woltlab/wcf/ts",
////      ]
//// }

// @Filename: node_modules/@woltlab/wcf/ts/WoltLabSuite/Core/Component/Dialog.ts
//// export class Dialog {}

// @Filename: ts/main.ts
//// Dialog/**/

verify.importFixModuleSpecifiers("", ["WoltLabSuite/Core/Component/Dialog"]);
