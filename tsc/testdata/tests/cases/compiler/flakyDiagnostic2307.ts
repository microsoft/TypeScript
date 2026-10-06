// @target: esnext
// @module: esnext
// @declaration: true

export enum Values {
    [import("missing").value] = 1,
}