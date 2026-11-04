//// [tests/cases/compiler/unknownAfterTypeofEarlyReturn.ts] ////

//// [unknownAfterTypeofEarlyReturn.ts]
declare function fromString(value: string): number;
declare function fromBigint(value: bigint): number;
declare function fromNumber(value: number): boolean;
function coerce(value: unknown) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return fromString(value);
    if (typeof value === "bigint") return fromBigint(value);
    if (typeof value === "number") return fromNumber(value);
}


//// [unknownAfterTypeofEarlyReturn.js]
"use strict";
function coerce(value) {
    if (typeof value === "boolean")
        return value;
    if (typeof value === "string")
        return fromString(value);
    if (typeof value === "bigint")
        return fromBigint(value);
    if (typeof value === "number")
        return fromNumber(value);
}
