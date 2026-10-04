// Each Kelvin sign 'K' below case-folds to the single-byte 'k', so with
// useCaseSensitiveFileNames off, the raw (non-canonicalized) rootDir is longer,
// in bytes, than the source file's own directory portion, even though the source
// file's full path (with its suffix) is longer overall. Computing the output path
// used to slice the source path using the *raw* rootDir's byte length, which
// panicked here since that byte length exceeded the directory portion's.
// @currentDirectory: /a
// @useCaseSensitiveFileNames: false
// @rootDir: /a/KKKK
// @outDir: /a/out

// @filename: /a/kkkk/a.ts
export const x = 1;
