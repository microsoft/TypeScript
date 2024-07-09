/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "files": [], "references": [{ "path": "tsconfig.build.json" }, { "path": "tsconfig.test.json" }] }

// @Filename: /tsconfig.build.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist/build", "composite": true }, "files": ["index.ts"] }

// @Filename: /index.ts
//// export * from "./util";

// @Filename: /tsconfig.test.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist/test", "composite": true }, "files": ["test.ts", "index.ts"] }

// @Filename: /test.ts
//// import "./util";

// @Filename: /util.ts
//// export {}

// util.ts is referenced by index.ts, which is included in tsconfig.build.json and tsconfig.test.json.
// That reference will be returned from both projects' language services. Test ensures it gets deduplicated.
verify.baselineGetFileReferences("/util.ts");
