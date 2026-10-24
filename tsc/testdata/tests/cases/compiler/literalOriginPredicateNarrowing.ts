// @strict: true
// @target: esnext
// @noEmit: true

declare function isString(value: unknown): value is string;
declare function isStringOrNumber(value: unknown): value is string | number;
declare function isNumberOrBigint(value: unknown): value is number | bigint;
declare let plain: string;
declare let tracked: "a" | string;
declare let numeric: 1 | number;
declare let big: 1n | bigint;
declare let mixed: "a" | string | boolean;

if (!isString(plain)) {
    const impossible: never = plain;
}
if (!isString(tracked)) {
    const impossible: never = tracked;
}
if (!isStringOrNumber(plain)) {
    const impossible: never = plain;
}
if (!isStringOrNumber(tracked)) {
    const impossible: never = tracked;
}
if (!isNumberOrBigint(numeric)) {
    const impossible: never = numeric;
}
if (!isNumberOrBigint(big)) {
    const impossible: never = big;
}
if (!isStringOrNumber(mixed)) {
    const remaining: boolean = mixed;
}
