 /// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "files": [], "references": [{ "path": "packages/server" }, { "path": "packages/client" }] }

// @Filename: /home/src/workspaces/project/packages/shared/tsconfig.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist", "composite": true } }

// @Filename: /home/src/workspaces/project/packages/shared/src/referenced.ts
//// export {};

// @Filename: /home/src/workspaces/project/packages/server/tsconfig.json
//// { "compilerOptions": { "checkJs": true }, "references": [{ "path": "../shared" }] }

// @Filename: /home/src/workspaces/project/packages/server/index.js
//// const mod = require("../shared/src/referenced");

// @Filename: /home/src/workspaces/project/packages/server/router.js
//// const blah = require("../shared/dist/referenced");

// @Filename: /home/src/workspaces/project/packages/client/tsconfig.json
//// { "compilerOptions": { "paths": { "@shared/*": ["../shared/src/*"] } }, "references": [{ "path": "../shared" }] }

// @Filename: /home/src/workspaces/project/packages/client/index.ts
//// import "@shared/referenced";

verify.baselineGetFileReferences("/home/src/workspaces/project/packages/shared/src/referenced.ts");
