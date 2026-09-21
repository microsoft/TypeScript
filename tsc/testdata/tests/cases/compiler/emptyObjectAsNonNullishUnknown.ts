// @strict: true
// @strictNullChecks: true, false
// @declaration: true
// @target: esnext

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