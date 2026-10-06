// @declaration: true
// @captureSuggestions: true

/** @deprecated */
declare const oldValue: { value: number };
export enum Values {
    [oldValue.value] = 1,
}