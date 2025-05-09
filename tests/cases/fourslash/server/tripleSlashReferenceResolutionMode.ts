/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "nodenext", "declaration": true, "strict": true, "outDir": "out" }, "files": ["./index.ts"] }

// @Filename: /home/src/workspaces/project/package.json
//// { "private": true, "type": "commonjs" }

// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
////{ "name": "pkg", "version": "0.0.1", "exports": { "require": "./require.cjs", "default": "./import.js" }, "type": "module" }

// @Filename: /home/src/workspaces/project/node_modules/pkg/require.d.cts
////export {};
////export interface PkgRequireInterface { member: any; }
////declare global { const pkgRequireGlobal: PkgRequireInterface; }

// @Filename: /home/src/workspaces/project/node_modules/pkg/import.d.ts
////export {};
////export interface PkgImportInterface { field: any; }
////declare global { const pkgImportGlobal: PkgImportInterface; }

// @Filename: /home/src/workspaces/project/index.ts
/////// <reference types="pkg" resolution-mode="import" />
////pkgImportGlobal;
////export {};

goTo.file("/home/src/workspaces/project/index.ts");
verify.numberOfErrorsInCurrentFile(0);
