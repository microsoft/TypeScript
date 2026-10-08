// @strict: true
// @noEmit: true
// @noUncheckedIndexedAccess: true, false

declare const dictionary: { [key: number]: boolean };
declare const plain: `${number}`;
declare const tracked: "1" | `${number}`;
type Key = "1" | "2" | `${number}`;
declare const aliased: Key;

export const plainResult = dictionary[plain];
export const trackedResult = dictionary[tracked];
export const aliasedResult = dictionary[aliased];
