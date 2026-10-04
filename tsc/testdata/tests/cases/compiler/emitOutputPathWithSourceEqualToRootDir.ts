// This intentionally file-valued rootDir makes the source path equal to the common source directory.
// The trailing separator added to that directory must not be used to slice the shorter source path.
// @currentDirectory: /a
// @rootDir: /a/k.ts
// @outDir: /a/out

// @filename: /a/k.ts
export const x = 1;
