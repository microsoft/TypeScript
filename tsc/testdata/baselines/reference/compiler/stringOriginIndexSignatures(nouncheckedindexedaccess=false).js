//// [tests/cases/compiler/stringOriginIndexSignatures.ts] ////

//// [stringOriginIndexSignatures.ts]
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

//// [stringOriginIndexSignatures.js]
export const numericAccess = indexed[0];
export const stringAccess = indexed["other"];
export const numericKey = 0;
export const stringKey = "other";
export const numericIndex = specific[0];
export const numericStringIndex = specific["0"];
export const patternIndex = specific["prefixValue"];
export const fallbackIndex = specific["other"];
export const remappedNumericKey = 0;
export const remappedNumericAccess = remapped[0];
indexed[invalidKey];
const source = { value: 1, [symbolKey]: "symbol" };
export const copied = { ...source };
export const inferredValue = inferValue(indexed);
export const canonicalIndex = indexed;
export const clonedIndex = canonicalIndex;
export const anyIndex = objectValue;
const primitive = wrapped;
export const unionAssignment = "value";
export const reducedUnion = typeof unionValue === "string" ? unionValue : "known";
export const mergedIndex = intersected["value"];
export const first = mergedIndex.first;
export const second = mergedIndex.second;
const rejected = incompatible;


//// [stringOriginIndexSignatures.d.ts]
type Key = "known" | string;
interface StringIndex {
    [key: Key]: number;
}
export declare const numericAccess: number;
export declare const stringAccess: number;
export declare const numericKey: keyof StringIndex;
export declare const stringKey: keyof StringIndex;
export declare const numericIndex: number;
export declare const numericStringIndex: number;
export declare const patternIndex: boolean;
export declare const fallbackIndex: any;
type Remapped<Value> = {
    [Property in keyof Value as Key]: Value[Property];
};
type RemappedValue = Remapped<{
    value: number;
}>;
export declare const remappedNumericKey: keyof RemappedValue;
export declare const remappedNumericAccess: number;
export declare const copied: StringIndex;
export declare const inferredValue: number;
export declare const canonicalIndex: {
    [key: string]: number;
};
export declare const clonedIndex: StringIndex;
interface AnyIndex {
    [key: Key]: any;
}
export declare const anyIndex: AnyIndex;
export declare const unionAssignment: Key | number;
export declare const reducedUnion: string;
export declare const mergedIndex: {
    first: number;
} & {
    second: string;
};
export declare const first: number;
export declare const second: string;
export {};
