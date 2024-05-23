/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "nodenext",
////         "types": ["inside-at-types", "outside-at-types"]
////     }
//// }

// @Filename: /node_modules/@types/inside-at-types/package.json
//// {
////   "name": "@types/inside-at-types",
////   "version": "1.0.0",
////   "types": "./index.d.ts",
////   "exports": {
////     ".": {
////       "default": "./main.mjs"
////     }
////   }
//// }

// @Filename: /node_modules/@types/inside-at-types/index.d.ts
//// export {};
//// declare global {
////   var typesFieldInsideAtTypes: any;
//// }

// @Filename: /node_modules/@types/inside-at-types/main.d.mts
//// export {};
//// declare global {
////   var exportsInsideAtTypes: any;
//// }

// @Filename: /node_modules/outside-at-types/package.json
//// {
////   "name": "outside-at-types",
////   "version": "1.0.0",
////   "types": "./index.d.ts",
////   "exports": {
////     ".": {
////       "default": "./main.mjs"
////     }
////   }
//// }

// @Filename: /node_modules/outside-at-types/index.d.ts
//// export {};
//// declare global {
////   var typesFieldOutsideAtTypes: any;
//// }

// @Filename: /node_modules/outside-at-types/main.d.mts
//// export {};
//// declare global {
////   var exportsOutsideAtTypes: any;
//// }

// @Filename: /index.ts
//// typesFieldInsideAtTypes;  // Error
//// typesFieldOutsideAtTypes; // Error
////
//// exportsInsideAtTypes;
//// exportsOutsideAtTypes;

goTo.file("/index.ts");
verify.baselineSyntacticAndSemanticDiagnostics();