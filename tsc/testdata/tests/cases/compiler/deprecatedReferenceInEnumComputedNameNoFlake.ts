// @declaration: true
// @captureSuggestions: true

// TS6385: 'oldValue' is deprecated.
/** @deprecated */
declare const oldValue: { value: number };
export enum Values {
    [oldValue.value] = 1,
}