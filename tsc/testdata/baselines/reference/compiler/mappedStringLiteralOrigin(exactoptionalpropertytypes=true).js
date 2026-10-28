//// [tests/cases/compiler/mappedStringLiteralOrigin.ts] ////

//// [mappedStringLiteralOrigin.ts]
type Keys = "a" | string;
type LegacyKeys = "a" | (string & {});
type Values = Record<Keys, number>;
type LegacyValues = Record<LegacyKeys, number>;

declare const values: Values;
declare const legacy: LegacyValues;
export const known = values.a;
export const other = values.other;
export const legacyKnown = legacy.a;
export const legacyOther = legacy.other;
const missing: Values = {};
const legacyMissing: LegacyValues = {};
const present: Values = { a: 1, other: 2 };
const plain: Record<string, number> = {};

type KeyValues = { [Key in Keys]: Key };
declare const keyValues: KeyValues;
export const literalValue = keyValues.a;
export const indexValue = keyValues.other;

type Remapped = { [Key in Keys as `get_${Key}`]: Key };
declare const remapped: Remapped;
export const remappedKnown = remapped.get_a;
export const remappedOther = remapped.get_other;

type OptionalValues = { readonly [Key in Keys]?: number };
declare let optional: OptionalValues;
export const optionalKnown = optional.a;
optional.a = 1;
type RequiredValues = { -readonly [Key in keyof OptionalValues]-?: OptionalValues[Key] };
declare let required: RequiredValues;
required.a = 1;
export const requiredKnown = required.a;
export const requiredOther = required.other;

type ExtendedKeys = Keys | "b" | number;
declare const extended: Record<ExtendedKeys, number>;
export const extendedKnown = extended.a;
export const extendedAdded = extended.b;
export const extendedIndex = extended[0];

type GenericValues<Key extends string> = Record<Key | string, number>;
declare const generic: GenericValues<"a" | "b">;
export const genericKnown = generic.a;
export const genericAdded = generic.b;
export const genericOther = generic.other;

type OnlyKnown<Value> = { [Key in Keys as Key extends "a" ? Key : never]: Value };
export function knownKey<Value>(): keyof OnlyKnown<Value> {
	return "a";
}
export function knownValue<Value>(value: OnlyKnown<Value>): Value {
	return value.a;
}
const filteredMissing: OnlyKnown<number> = {};
const filteredPresent: OnlyKnown<number> = { a: 1 };

type WithoutKnown<Value> = { [Key in Keys as Key extends "a" ? never : Key]: Value };
const filteredPlain: WithoutKnown<number> = {};
declare const filtered: WithoutKnown<number>;
export const filteredAccess = filtered.a;

//// [mappedStringLiteralOrigin.js]
export const known = values.a;
export const other = values.other;
export const legacyKnown = legacy.a;
export const legacyOther = legacy.other;
const missing = {};
const legacyMissing = {};
const present = { a: 1, other: 2 };
const plain = {};
export const literalValue = keyValues.a;
export const indexValue = keyValues.other;
export const remappedKnown = remapped.get_a;
export const remappedOther = remapped.get_other;
export const optionalKnown = optional.a;
optional.a = 1;
required.a = 1;
export const requiredKnown = required.a;
export const requiredOther = required.other;
export const extendedKnown = extended.a;
export const extendedAdded = extended.b;
export const extendedIndex = extended[0];
export const genericKnown = generic.a;
export const genericAdded = generic.b;
export const genericOther = generic.other;
export function knownKey() {
    return "a";
}
export function knownValue(value) {
    return value.a;
}
const filteredMissing = {};
const filteredPresent = { a: 1 };
const filteredPlain = {};
export const filteredAccess = filtered.a;


//// [mappedStringLiteralOrigin.d.ts]
type Keys = "a" | string;
export declare const known: number;
export declare const other: number | undefined;
export declare const legacyKnown: number;
export declare const legacyOther: number | undefined;
export declare const literalValue: "a";
export declare const indexValue: string | undefined;
export declare const remappedKnown: "a";
export declare const remappedOther: string | undefined;
export declare const optionalKnown: number | undefined;
export declare const requiredKnown: number;
export declare const requiredOther: number | undefined;
export declare const extendedKnown: number;
export declare const extendedAdded: number;
export declare const extendedIndex: number | undefined;
export declare const genericKnown: number;
export declare const genericAdded: number;
export declare const genericOther: number | undefined;
type OnlyKnown<Value> = {
    [Key in Keys as Key extends "a" ? Key : never]: Value;
};
export declare function knownKey<Value>(): keyof OnlyKnown<Value>;
export declare function knownValue<Value>(value: OnlyKnown<Value>): Value;
export declare const filteredAccess: number | undefined;
export {};
