// @declaration: true

// TS2552: Cannot find name 'existingVale'. Did you mean 'existingValue'?
declare const existingValue: { value: number };
export enum Values {
    [existingVale.value] = 1,
}