// @declaration: true

// TS2304: Cannot find name 'missing'.
export enum Values {
    [missing.value] = 1,
}