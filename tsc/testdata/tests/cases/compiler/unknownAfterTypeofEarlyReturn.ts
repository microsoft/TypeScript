// @target: es2021
// @strict: true

declare function fromString(value: string): number;
declare function fromBigint(value: bigint): number;
declare function fromNumber(value: number): boolean;
function coerce(value: unknown) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return fromString(value);
    if (typeof value === "bigint") return fromBigint(value);
    if (typeof value === "number") return fromNumber(value);
}
