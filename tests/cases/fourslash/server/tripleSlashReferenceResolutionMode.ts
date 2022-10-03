/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext", "declaration": true, "strict": true, "outDir": "out" }, "files": ["./index.ts"] }

// @Filename: /package.json
//// { "private": true, "type": "commonjs" }

// @Filename: /node_modules/pkg/package.json
////{ "name": "pkg", "version": "0.0.1", "exports": { "require": "./require.cjs", "default": "./import.js" }, "type": "module" }

// @Filename: /node_modules/pkg/require.d.cts
////export {};
////export interface PkgRequireInterface { member: any; }
////declare global { const pkgRequireGlobal: PkgRequireInterface; }

// @Filename: /node_modules/pkg/import.d.ts
////export {};
////export interface PkgImportInterface { field: any; }
////declare global { const pkgImportGlobal: PkgImportInterface; }

// @Filename: /index.ts
/////// <reference types="pkg" resolution-mode="import" />
////pkgImportGlobal;
////export {};

goTo.file("/index.ts");
verify.numberOfErrorsInCurrentFile(0);
