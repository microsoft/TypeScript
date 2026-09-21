// @strict: true
// @target: esnext
// @noUncheckedIndexedAccess: true, false
// @declaration: true

type Key = "known" | string;

interface StringIndex {
    [key: Key]: number;
}

declare const indexed: StringIndex;
export const numericAccess = indexed[0];
export const stringAccess = indexed["other"];
export const numericKey: keyof StringIndex = 0;
export const stringKey: keyof StringIndex = "other";

interface SpecificIndices {
    [key: Key]: any;
    [key: number]: number;
    [key: `prefix${string}`]: boolean;
}

declare const specific: SpecificIndices;
export const numericIndex = specific[0];
export const numericStringIndex = specific["0"];
export const patternIndex = specific["prefixValue"];
export const fallbackIndex = specific["other"];

type Remapped<Value> = { [Property in keyof Value as Key]: Value[Property] };
type RemappedValue = Remapped<{ value: number }>;
export const remappedNumericKey: keyof RemappedValue = 0;
declare const remapped: RemappedValue;
export const remappedNumericAccess = remapped[0];

declare const invalidKey: {};
indexed[invalidKey];

declare const symbolKey: unique symbol;
const source = { value: 1, [symbolKey]: "symbol" };
export const copied: StringIndex = { ...source };

declare function inferValue<Value>(value: { [key: string]: Value }): Value;
export const inferredValue = inferValue(indexed);
export const canonicalIndex: { [key: string]: number } = indexed;
export const clonedIndex: StringIndex = canonicalIndex;

interface AnyIndex {
    [key: Key]: any;
}
interface ObjectValue {
    value: number;
}
declare const objectValue: ObjectValue;
export const anyIndex: AnyIndex = objectValue;

declare const wrapped: String;
const primitive: Key = wrapped;

declare const unionValue: Key | number;
export const unionAssignment: Key | number = "value";
export const reducedUnion = typeof unionValue === "string" ? unionValue : "known";

declare const intersected: { [key: Key]: { first: number } } & { [key: "other" | string]: { second: string } };
export const mergedIndex = intersected["value"]!;
export const first = mergedIndex.first;
export const second = mergedIndex.second;

declare const incompatible: { [key: string]: string };
const rejected: StringIndex = incompatible;