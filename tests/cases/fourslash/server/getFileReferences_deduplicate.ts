/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "files": [], "references": [{ "path": "tsconfig.build.json" }, { "path": "tsconfig.test.json" }] }

// @Filename: /home/src/workspaces/project/tsconfig.utils.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist/utils", "composite": true }, "files": ["util.ts"] }

// @Filename: /home/src/workspaces/project/tsconfig.build.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist/build", "composite": true }, "files": ["index.ts"], "references": [{ "path": "tsconfig.utils.json" }] }

// @Filename: /home/src/workspaces/project/index.ts
//// export * from "./util";

// @Filename: /home/src/workspaces/project/tsconfig.test.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist/test", "composite": true }, "files": ["test.ts", "index.ts"], "references": [{ "path": "tsconfig.utils.json" }] }

// @Filename: /home/src/workspaces/project/test.ts
//// import "./util";

// @Filename: /home/src/workspaces/project/util.ts
//// export {}

// util.ts is referenced by index.ts, which is included in tsconfig.build.json and tsconfig.test.json.
// That reference will be returned from both projects' language services. Test ensures it gets deduplicated.
verify.baselineGetFileReferences("/home/src/workspaces/project/util.ts");
