//// [tests/cases/compiler/numericLiteralOrigins.ts] ////

//// [numericLiteralOrigins.ts]
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

//// [numericLiteralOrigins.js]
const numericIdentity = true;
const bigintIdentity = true;
const mergedIdentity = true;
const mergedBigIdentity = true;
const intersectionIdentity = true;
const bigIntersectionIdentity = true;
export const known = values[1];
export const other = values[3];
const missing = {};
const present = { 1: 1, 2: 2 };
const plain = {};
export const literalValue = keyValues[1];
export const indexValue = keyValues[3];
export const bigKnown = remapped["1"];
export const bigOther = remapped["3"];
export const genericKnown = generic[1];
export const genericOther = generic[3];
export const numericAccess = indexed[0];
export const numericStringAccess = indexed["0"];
export const key = 0;
export const invalidKey = "invalid";
export const inferred = inferValue(indexed);
export const combined = intersection[0];
export const first = combined.first;
export const second = combined.second;
export function widenNumeric(value) { return value; }
export function widenBigint(value) { return value; }


//// [numericLiteralOrigins.d.ts]
type Numeric = 1 | 2 | number;
type Big = 1n | 2n | bigint;
export declare const known: number;
export declare const other: number | undefined;
export declare const literalValue: 1;
export declare const indexValue: number | undefined;
export declare const bigKnown: 1n;
export declare const bigOther: bigint | undefined;
export declare const genericKnown: string;
export declare const genericOther: string | undefined;
interface NumericIndex {
    [key: Numeric]: string;
}
export declare const numericAccess: string | undefined;
export declare const numericStringAccess: string | undefined;
export declare const key: keyof NumericIndex;
export declare const invalidKey: keyof NumericIndex;
export declare const inferred: string;
export declare const combined: {
    first: number;
} & {
    second: string;
};
export declare const first: number;
export declare const second: string;
export declare function widenNumeric(value: Numeric): number;
export declare function widenBigint(value: Big): bigint;
export {};
