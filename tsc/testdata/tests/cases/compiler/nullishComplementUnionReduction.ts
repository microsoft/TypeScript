// @strict: true
// @target: esnext
// @declaration: true

declare const withoutUndefined: not undefined;
declare const withoutNull: not null;
const nullable: {} | null = withoutUndefined;
const optional: {} | undefined = withoutNull;
const nullableBack: not undefined = nullable;
const optionalBack: not null = optional;

export function keepDefined<Value>(value: Value | undefined): Value & ({} | null) {
    if (value !== undefined) return value;
    throw new Error();
}

export function keepNotNull<Value>(value: Value | null): Value & ({} | undefined) {
    if (value !== null) return value;
    throw new Error();
}

export function keepDefinedDistributed<Value>(value: Value | undefined): (Value & {}) | (Value & null) {
    if (value !== undefined) return value;
    throw new Error();
}

export function keepNotNullDistributed<Value>(value: Value | null): (Value & {}) | (Value & undefined) {
    if (value !== null) return value;
    throw new Error();
}

export function keepDefinedWidened<Value>(value: Value | undefined): (Value & ({} | null)) | undefined {
    if (value !== undefined) return value;
    throw new Error();
}

export function keepNotNullWidened<Value>(value: Value | null): (Value & ({} | undefined)) | null {
    if (value !== null) return value;
    throw new Error();
}

export function keepDefinedExtra<Value>(value: Value | undefined): (Value & ({} | null)) | { kind: "extra" } {
    if (value !== undefined) return value;
    throw new Error();
}

type Defined<Value> = Value & ({} | null);
export function keepDefinedAlias<Value>(value: Value | undefined): Defined<Value> | undefined {
    if (value !== undefined) return value;
    throw new Error();
}

export function reverseDefined<Value>(value: (Value & null) | (Value & {})): Value & not undefined {
    return value;
}

export function reorderedFactors<Left, Right>(value: (Left & Right) | undefined): ({} & Left & Right) | (null & Right & Left) {
    if (value !== undefined) return value;
    throw new Error();
}

export function bothNullables<Value>(value: Value): (Value & {}) | (Value & null) | (Value & undefined) {
    return value;
}

export function singleExclusion<Value>(value: Value): (Value & not null) | (Value & null) {
    return value;
}

export function bareNull<Value>(value: Value | null | undefined): (Value & {}) | null {
    if (value !== undefined) return value;
    throw new Error();
}

export function preserveBareNull<Value>(value: (Value & {}) | null): Value & not undefined {
    return value;
}

export function preserveNullableExclusion<Value>(value: Value): (Value & {}) | (Value & null) {
    return value;
}

export function freshAndRegularExclusion<Value>(value: Value & not undefined, chooseValue: boolean): Value {
    if (typeof value !== "undefined") {
        return chooseValue ? value : undefined;
    }
    throw new Error();
}

export function differentFactors<Left, Right>(value: Left | undefined): (Left & {}) | (Right & null) {
    if (value !== undefined) return value;
    throw new Error();
}

export function preserveExtra<Value>(value: Value | { kind: "extra" }): Value & not undefined {
    if (value !== undefined) return value;
    throw new Error();
}

export function* definedValues<Value>(values: Iterable<Value | undefined>): Generator<Value & ({} | null), void, unknown> {
    for (const value of values) {
        if (value !== undefined) yield value;
    }
}

declare const other: not string & not number;
const stillNotNumber: not number = other;
const notCovered: (not string & not number) | "literal" = "different";

declare const allowedNull: not undefined;
const excludedUndefined: typeof allowedNull = undefined;
const includedNull: typeof allowedNull = null;

let uninitialized: {};
uninitialized.toString();

declare const maybeValue: {} | undefined;
if (maybeValue !== undefined) {
    maybeValue.toString();
}