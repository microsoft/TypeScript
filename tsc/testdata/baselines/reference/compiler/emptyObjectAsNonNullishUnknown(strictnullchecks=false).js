//// [tests/cases/compiler/emptyObjectAsNonNullishUnknown.ts] ////

//// [emptyObjectAsNonNullishUnknown.ts]
type NonNullish = unknown & not null & not undefined;
type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends
    (<Value>() => Value extends Right ? 1 : 2) ? true : false;
const equivalent: Equal<{}, NonNullish> = true;
const reversed: Equal<{}, not undefined & not null> = true;
const coversUnknown: Equal<{} | null | undefined, unknown> = true;
declare const unknownValue: unknown;
const covered: {} | null | undefined = unknownValue;

declare const nonNullish: NonNullish;
const empty: {} = nonNullish;
const roundTrip: NonNullish = empty;
const primitive: {} = 0;
const nullValue: {} = null;
const undefinedValue: {} = undefined;
const objectValue: object = empty;
const indexedValue: { [key: string]: number } = empty;

type Base = { first: string } & { second: number } & {};
interface Derived extends Base {
    third: boolean;
}

export function withoutNull(value: unknown) {
    if (value !== null) return value;
    throw new Error();
}

export function withoutUndefined(value: unknown) {
    if (value !== undefined) return value;
    throw new Error();
}

export function withoutNullish(value: unknown) {
    if (value != null) return value;
    throw new Error();
}

export function onlyNullish(value: unknown) {
    if (value == null) return value;
    throw new Error();
}

export function genericWithoutNullish<Value>(value: Value) {
    if (value != null) return value;
    throw new Error();
}

declare const optionalObject: { value: number } | undefined;
declare const possiblyEmpty: { value: number } | {};
export const optionalSpread = { ...optionalObject };
export const emptySpread = { ...possiblyEmpty };
export const emptySpreadValue = emptySpread.value;
export const emptyLiteral = {};
export const emptyKeys: keyof {} = "missing";

//// [emptyObjectAsNonNullishUnknown.js]
const equivalent = true;
const reversed = true;
const coversUnknown = true;
const covered = unknownValue;
const empty = nonNullish;
const roundTrip = empty;
const primitive = 0;
const nullValue = null;
const undefinedValue = undefined;
const objectValue = empty;
const indexedValue = empty;
export function withoutNull(value) {
    if (value !== null)
        return value;
    throw new Error();
}
export function withoutUndefined(value) {
    if (value !== undefined)
        return value;
    throw new Error();
}
export function withoutNullish(value) {
    if (value != null)
        return value;
    throw new Error();
}
export function onlyNullish(value) {
    if (value == null)
        return value;
    throw new Error();
}
export function genericWithoutNullish(value) {
    if (value != null)
        return value;
    throw new Error();
}
export const optionalSpread = { ...optionalObject };
export const emptySpread = { ...possiblyEmpty };
export const emptySpreadValue = emptySpread.value;
export const emptyLiteral = {};
export const emptyKeys = "missing";


//// [emptyObjectAsNonNullishUnknown.d.ts]
export declare function withoutNull(value: unknown): unknown;
export declare function withoutUndefined(value: unknown): unknown;
export declare function withoutNullish(value: unknown): unknown;
export declare function onlyNullish(value: unknown): unknown;
export declare function genericWithoutNullish<Value>(value: Value): Value;
export declare const optionalSpread: {
    value: number;
};
export declare const emptySpread: {
    value?: number;
};
export declare const emptySpreadValue: number;
export declare const emptyLiteral: {};
export declare const emptyKeys: keyof {};
