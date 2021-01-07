/// <reference path="../fourslash.ts" />

// @Filename: /a/package.json
//// {}

// @Filename: /a/tsconfig.json
//// {}

// @Filename: /a/index.ts
//// class A {}

// @Filename: /a/index.d.ts
//// declare class A {
//// }
//// //# sourceMappingURL=index.d.ts.map

// @Filename: /a/index.d.ts.map
//// {"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,OAAO,OAAO,CAAC;CAAG"}

// @Filename: /b/tsconfig.json
//// {
////   "compilerOptions": { "disableSourceOfProjectReferenceRedirect": true },
////   "references": [{ "path": "../a" }]
//// }

// @Filename: /b/b.ts
//// /// <reference path="../a/index.d.ts" />
//// new A/**/();

// @Filename: /c/package.json
//// { "dependencies": { "a": "*" } }

// @Filename: /c/tsconfig.json
//// { "references" [{ "path": "../a" }] }

// @Filename: /c/index.ts
//// export {};

// @link: /a -> /c/node_modules/a

// Test asserts lack of crash
goTo.file("/c/index.ts"); // Create AutoImportProviderProject that has /a/index.d.ts in it
verify.baselineFindAllReferences("");
