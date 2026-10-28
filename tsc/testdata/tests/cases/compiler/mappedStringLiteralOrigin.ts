// @strict: true
// @target: esnext
// @noUncheckedIndexedAccess: true
// @exactOptionalPropertyTypes: true, false
// @declaration: true

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