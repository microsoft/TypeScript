// @target: es2015
// @noImplicitReferences: true
// @typeRoots: /typings
// @types: package/
// @traceResolution: true
// @currentDirectory: /

// @Filename: /typings/package.d.ts
declare const fromFile: number;

// @Filename: /typings/package/index.d.ts
declare const fromDirectory: number;

// @Filename: /a.ts
fromDirectory;
fromFile;
