// @strict: true
// @target: esnext
// @noUncheckedIndexedAccess: true
// @declaration: true

type Numeric = 1 | 2 | number;
type Big = 1n | 2n | bigint;
type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends
    (<Value>() => Value extends Right ? 1 : 2) ? true : false;
const numericIdentity: Equal<Numeric, number> = true;
const bigintIdentity: Equal<Big, bigint> = true;
const mergedIdentity: Equal<Numeric | number, number> = true;
const mergedBigIdentity: Equal<Big | bigint, bigint> = true;
const intersectionIdentity: Equal<Numeric & {}, number> = true;
const bigIntersectionIdentity: Equal<Big & {}, bigint> = true;

declare const values: Record<Numeric, number>;
export const known = values[1];
export const other = values[3];
const missing: Record<Numeric, number> = {};
const present: Record<Numeric, number> = { 1: 1, 2: 2 };
const plain: Record<number, number> = {};
declare const keyValues: { [Key in Numeric]: Key };
export const literalValue = keyValues[1];
export const indexValue = keyValues[3];

declare const remapped: { [Key in Big as `${Key}`]: Key };
export const bigKnown = remapped["1"];
export const bigOther = remapped["3"];
type GenericNumeric<Key extends number> = Record<Key | number, string>;
declare const generic: GenericNumeric<1 | 2>;
export const genericKnown = generic[1];
export const genericOther = generic[3];

interface NumericIndex { [key: Numeric]: string }
declare const indexed: NumericIndex;
export const numericAccess = indexed[0];
export const numericStringAccess = indexed["0"];
export const key: keyof NumericIndex = 0;
export const invalidKey: keyof NumericIndex = "invalid";

declare function inferValue<Value>(value: { [key: number]: Value }): Value;
export const inferred = inferValue(indexed);
declare const intersection: { [key: Numeric]: { first: number } } & { [key: 3 | number]: { second: string } };
export const combined = intersection[0]!;
export const first = combined.first;
export const second = combined.second;

export function widenNumeric(value: Numeric) { return value; }
export function widenBigint(value: Big) { return value; }