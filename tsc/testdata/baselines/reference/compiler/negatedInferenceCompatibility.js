//// [tests/cases/compiler/negatedInferenceCompatibility.ts] ////

//// [negatedInferenceCompatibility.ts]
export function formatFlags(value: number, flags: readonly number[]) {
    if (value === 0) return true;
    let remainingFlags = value;
    for (const flag of flags) {
        remainingFlags &= ~flag;
    }
    return remainingFlags === 0;
}

export function lookupOptions(options: object, setting: string) {
    const names = Object.keys(options).filter(k => k !== "init" && k !== "help" && k !== "watch");
    return names.indexOf(setting);
}

export function mutableNumber(value: number) {
    if (value === 0) throw new Error();
    let copy = value;
    copy = 0;
    return copy;
}

export function mutableString(value: string) {
    if (value === "") throw new Error();
    let copy = value;
    copy += "suffix";
    copy = "";
    return copy;
}

export function mutableBigInt(value: bigint) {
    if (value === 0n) throw new Error();
    let copy = value;
    copy *= 0n;
    copy = 0n;
    return copy;
}

export function preservedBounds(value: number) {
    if (value === 0) throw new Error();
    const constant = value;
    const retained: number & not 0 = constant;
    let annotated: number & not 0 = value;
    annotated = 0;
    return retained;
}

export function assertedBounds(value: number) {
    let asserted = (value as number & not 0);
    asserted = 0;
    let nonNull = (value as number & not 0)!;
    nonNull = 0;
    let satisfies = (value as number & not 0) satisfies number;
    satisfies = 0;
    return asserted;
}

export function nonString(value: unknown) {
    if (typeof value === "string") throw new Error();
    let copy = value;
    const retained: not string = copy;
    return retained;
}

export const notEmpty = (value: string) => value !== "";
export const explicitlyNotEmpty = (value: string): value is string & not "" => value !== "";
export const notString = (value: unknown) => typeof value !== "string";

export function filteredLiterals(values: ("init" | "help" | "other")[]) {
    return values.filter(value => value !== "init" && value !== "help");
}

export function explicitlyFiltered(values: string[]) {
    return values.filter(explicitlyNotEmpty);
}


//// [negatedInferenceCompatibility.js]
export function formatFlags(value, flags) {
    if (value === 0)
        return true;
    let remainingFlags = value;
    for (const flag of flags) {
        remainingFlags &= ~flag;
    }
    return remainingFlags === 0;
}
export function lookupOptions(options, setting) {
    const names = Object.keys(options).filter(k => k !== "init" && k !== "help" && k !== "watch");
    return names.indexOf(setting);
}
export function mutableNumber(value) {
    if (value === 0)
        throw new Error();
    let copy = value;
    copy = 0;
    return copy;
}
export function mutableString(value) {
    if (value === "")
        throw new Error();
    let copy = value;
    copy += "suffix";
    copy = "";
    return copy;
}
export function mutableBigInt(value) {
    if (value === 0n)
        throw new Error();
    let copy = value;
    copy *= 0n;
    copy = 0n;
    return copy;
}
export function preservedBounds(value) {
    if (value === 0)
        throw new Error();
    const constant = value;
    const retained = constant;
    let annotated = value;
    annotated = 0;
    return retained;
}
export function assertedBounds(value) {
    let asserted = value;
    asserted = 0;
    let nonNull = value;
    nonNull = 0;
    let satisfies = value;
    satisfies = 0;
    return asserted;
}
export function nonString(value) {
    if (typeof value === "string")
        throw new Error();
    let copy = value;
    const retained = copy;
    return retained;
}
export const notEmpty = (value) => value !== "";
export const explicitlyNotEmpty = (value) => value !== "";
export const notString = (value) => typeof value !== "string";
export function filteredLiterals(values) {
    return values.filter(value => value !== "init" && value !== "help");
}
export function explicitlyFiltered(values) {
    return values.filter(explicitlyNotEmpty);
}


//// [negatedInferenceCompatibility.d.ts]
export declare function formatFlags(value: number, flags: readonly number[]): boolean;
export declare function lookupOptions(options: object, setting: string): number;
export declare function mutableNumber(value: number): number;
export declare function mutableString(value: string): string;
export declare function mutableBigInt(value: bigint): bigint;
export declare function preservedBounds(value: number): number & not 0;
export declare function assertedBounds(value: number): number & not 0;
export declare function nonString(value: unknown): not string;
export declare const notEmpty: (value: string) => boolean;
export declare const explicitlyNotEmpty: (value: string) => value is string & not "";
export declare const notString: (value: unknown) => value is not string;
export declare function filteredLiterals(values: ("init" | "help" | "other")[]): "other"[];
export declare function explicitlyFiltered(values: string[]): (string & not "")[];
