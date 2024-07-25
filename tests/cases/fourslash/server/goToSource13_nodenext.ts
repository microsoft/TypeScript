/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/left-pad/package.json
//// {
////   "name": "left-pad",
////   "version": "1.3.0",
////   "description": "String left pad",
////   "main": "index.js",
////   "types": "index.d.ts"
//// }

// @Filename: /node_modules/left-pad/index.d.ts
//// declare function leftPad(str: string|number, len: number, ch?: string|number): string;
//// declare namespace leftPad { }
//// export = leftPad;

// @Filename: /node_modules/left-pad/index.js
//// module.exports = leftPad;
//// function /*end*/leftPad(str, len, ch) {}

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////       "module": "node16",
////       "strict": true,
////       "outDir": "./out",
//// 
////   }
//// }

// @Filename: /index.mts
//// import leftPad = require("left-pad");
//// /*start*/leftPad("", 4);

verify.baselineGoToSourceDefinition("start");
