// @strict: true
// @target: esnext
// @declaration: true

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
