// @moduleResolution: node10
// @module: commonjs

// repro from https://github.com/microsoft/TypeScript/issues/54342

// @Filename: replace-in-file/types/index.d.ts
declare module 'replace-in-file' {
  export function replaceInFile(config: unknown): Promise<unknown[]>;
  export default replaceInFile;

  namespace replaceInFile {
    export function sync(config: unknown): unknown[];
  }
}