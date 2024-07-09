/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "files": [], "references": [{ "path": "packages/server" }, { "path": "packages/client" }] }

// @Filename: /packages/shared/tsconfig.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist", "composite": true } }

// @Filename: /packages/shared/src/referenced.ts
//// export {};

// @Filename: /packages/server/tsconfig.json
//// { "compilerOptions": { "checkJs": true }, "references": [{ "path": "../shared" }] }

// @Filename: /packages/server/index.js
//// const mod = require("../shared/src/referenced");

// @Filename: /packages/server/router.js
//// const blah = require("../shared/dist/referenced");

// @Filename: /packages/client/tsconfig.json
//// { "compilerOptions": { "paths": { "@shared/*": ["../shared/src/*"] } }, "references": [{ "path": "../shared" }] }

// @Filename: /packages/client/index.ts
//// import "@shared/referenced";

verify.baselineGetFileReferences("/packages/shared/src/referenced.ts");
