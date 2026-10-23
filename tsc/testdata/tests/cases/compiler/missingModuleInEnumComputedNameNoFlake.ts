// @target: esnext
// @module: esnext
// @declaration: true

// TS2307: Cannot find module 'missing' or its corresponding type declarations.
export enum Values {
    [import("missing").value] = 1,
}