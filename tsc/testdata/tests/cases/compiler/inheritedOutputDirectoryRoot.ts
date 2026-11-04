// @target: es2015
// @noImplicitReferences: true
// @fullEmitPaths: true

// @filename: /project/base.json
{ "compilerOptions": { "outDir": "dist" } }

// @filename: /project/src/index.ts
export const value = 0;

// @filename: /project/tsconfig.json
{ "extends": "./base.json", "compilerOptions": {}, "files": ["src/index.ts"] }
