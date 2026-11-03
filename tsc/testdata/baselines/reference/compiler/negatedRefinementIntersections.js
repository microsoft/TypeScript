//// [tests/cases/compiler/negatedRefinementIntersections.ts] ////

//// [negatedRefinementIntersections.ts]
type Falsy = "" | 0 | 0n | false | null | undefined;

export function truthy<T>(value: T) {
    if (value) {
        const refined: T & not Falsy = value;
        return refined;
    }
    return undefined;
}

export function falsy<T>(value: T) {
    if (!value) {
        const refined: T & Falsy = value;
        return refined;
    }
    return undefined;
}

export function nullable<T>(value: T) {
    if (value === undefined) {
        const refined: T & undefined = value;
        return refined;
    }
    if (value === null) {
        const refined: T & null = value;
        return refined;
    }
    const refined: T & not null & not undefined = value;
    return refined;
}

export function nullish<T>(value: T) {
    if (value == null) {
        const refined: T & (null | undefined) = value;
        return refined;
    }
    const refined: T & {} = value;
    return refined;
}

export function primitive<T>(value: T) {
    if (typeof value === "string") {
        const refined: T & string = value;
        return refined;
    }
    const refined: T & not string = value;
    return refined;
}

export function exhaustive(value: unknown): number {
    switch (typeof value) {
        case "string": return 1;
        case "number": return 2;
        case "bigint": return 3;
        case "boolean": return 4;
        case "symbol": return 5;
        case "undefined": return 6;
        case "object": return 7;
        case "function": return 8;
    }
}

export function excludedFalsy(value: not Falsy) {
    const negated: false = !value;
    const fallback: not Falsy = value || "fallback";
    return { negated, fallback };
}

export function stringBranches(value: string) {
    if (value) {
        const refined: string & not "" = value;
        return refined;
    } else {
        const refined: "" = value;
        return refined;
    }
}

export function primitiveBranches(value: number | bigint | boolean | undefined) {
    if (value) {
        const refined: (number | bigint | boolean) & not (0 | 0n | false) = value;
        return refined;
    }
    const refined: 0 | 0n | false | undefined = value;
    return refined;
}

export function taggedString(value: string & { readonly tag: unique symbol }) {
    if (!value) {
        const refined: "" = value;
        return refined;
    }
    const refined: string & not "" = value;
    return refined;
}

export function optionalDiscriminant(value: { error: Error; result?: never } | { error?: never; result: string }) {
    if (value.error) throw value.error;
    return value.result.toUpperCase();
}

export function callable<T extends (() => void) | number, U extends { value: string } | number>(value: T | U) {
    if (typeof value === "function") {
        const refined: T = value;
        value();
    } else if (typeof value === "object") {
        const refined: U = value;
        return value.value;
    }
    return value;
}

export function optionalArray<T extends unknown[] | undefined>(value: T) {
    if (typeof value === "undefined") return;
    for (const element of value) {}
    return [...value];
}

export function logicalOperators<T>(value: T) {
    if (value) {
        const and: number = value && 1;
        const or: T & not Falsy = value || 1;
        return { and, or };
    }
    return undefined;
}

export function compoundAssignments(value: number, holder: { value?: number }) {
    if (value) value -= 1;
    if (holder.value) holder.value += 1;
    if (holder["value"]) holder["value"] *= 2;
    return holder.value;
}

export function rejoinedUnknown(value: unknown) {
    if (value === undefined) {}
    if (value === null) {}
    type IsUnknown = unknown extends typeof value ? true : false;
    const unchanged: IsUnknown = true;
    return unchanged;
}

export function rejoinedTypeofTruthiness(value: unknown, condition: boolean) {
    if (typeof value === "object") {}
    if (typeof value === "object" && value) {}
    if (value && typeof value === "object") {}
    if (condition && value && typeof value === "object") {}
    type IsUnknown = unknown extends typeof value ? true : false;
    const unchanged: IsUnknown = true;
    return unchanged;
}

export function nonCallable<T>(value: T) {
    if (typeof value !== "function") {
        const refined: T & not Function = value;
        return refined;
    }
    return undefined;
}

export function typeofDefault<T>(value: T) {
    switch (typeof value) {
        case "string":
        case "number":
            return undefined;
        default: {
            const refined: T & not string & not number = value;
            return refined;
        }
    }
}

enum NumberChoice { Empty = 0, First = 1, Second = 2 }
enum StringChoice { Empty = "", Present = "present" }

export function enumTruthiness(value: NumberChoice, text: StringChoice) {
    if (value) {
        const refined: NumberChoice.First | NumberChoice.Second = value;
    } else {
        const refined: NumberChoice.Empty = value;
    }
    if (text) {
        const refined: StringChoice.Present = text;
    } else {
        const refined: StringChoice.Empty = text;
    }
    return [value || "fallback", text || "fallback"];
}

export function brandedPrimitiveTypeof(value: number & { brand: "number" }) {
    if (typeof value === "function") {
        const impossible: never = value;
    }
}


//// [negatedRefinementIntersections.js]
export function truthy(value) {
    if (value) {
        const refined = value;
        return refined;
    }
    return undefined;
}
export function falsy(value) {
    if (!value) {
        const refined = value;
        return refined;
    }
    return undefined;
}
export function nullable(value) {
    if (value === undefined) {
        const refined = value;
        return refined;
    }
    if (value === null) {
        const refined = value;
        return refined;
    }
    const refined = value;
    return refined;
}
export function nullish(value) {
    if (value == null) {
        const refined = value;
        return refined;
    }
    const refined = value;
    return refined;
}
export function primitive(value) {
    if (typeof value === "string") {
        const refined = value;
        return refined;
    }
    const refined = value;
    return refined;
}
export function exhaustive(value) {
    switch (typeof value) {
        case "string": return 1;
        case "number": return 2;
        case "bigint": return 3;
        case "boolean": return 4;
        case "symbol": return 5;
        case "undefined": return 6;
        case "object": return 7;
        case "function": return 8;
    }
}
export function excludedFalsy(value) {
    const negated = !value;
    const fallback = value || "fallback";
    return { negated, fallback };
}
export function stringBranches(value) {
    if (value) {
        const refined = value;
        return refined;
    }
    else {
        const refined = value;
        return refined;
    }
}
export function primitiveBranches(value) {
    if (value) {
        const refined = value;
        return refined;
    }
    const refined = value;
    return refined;
}
export function taggedString(value) {
    if (!value) {
        const refined = value;
        return refined;
    }
    const refined = value;
    return refined;
}
export function optionalDiscriminant(value) {
    if (value.error)
        throw value.error;
    return value.result.toUpperCase();
}
export function callable(value) {
    if (typeof value === "function") {
        const refined = value;
        value();
    }
    else if (typeof value === "object") {
        const refined = value;
        return value.value;
    }
    return value;
}
export function optionalArray(value) {
    if (typeof value === "undefined")
        return;
    for (const element of value) { }
    return [...value];
}
export function logicalOperators(value) {
    if (value) {
        const and = value && 1;
        const or = value || 1;
        return { and, or };
    }
    return undefined;
}
export function compoundAssignments(value, holder) {
    if (value)
        value -= 1;
    if (holder.value)
        holder.value += 1;
    if (holder["value"])
        holder["value"] *= 2;
    return holder.value;
}
export function rejoinedUnknown(value) {
    if (value === undefined) { }
    if (value === null) { }
    const unchanged = true;
    return unchanged;
}
export function rejoinedTypeofTruthiness(value, condition) {
    if (typeof value === "object") { }
    if (typeof value === "object" && value) { }
    if (value && typeof value === "object") { }
    if (condition && value && typeof value === "object") { }
    const unchanged = true;
    return unchanged;
}
export function nonCallable(value) {
    if (typeof value !== "function") {
        const refined = value;
        return refined;
    }
    return undefined;
}
export function typeofDefault(value) {
    switch (typeof value) {
        case "string":
        case "number":
            return undefined;
        default: {
            const refined = value;
            return refined;
        }
    }
}
var NumberChoice;
(function (NumberChoice) {
    NumberChoice[NumberChoice["Empty"] = 0] = "Empty";
    NumberChoice[NumberChoice["First"] = 1] = "First";
    NumberChoice[NumberChoice["Second"] = 2] = "Second";
})(NumberChoice || (NumberChoice = {}));
var StringChoice;
(function (StringChoice) {
    StringChoice["Empty"] = "";
    StringChoice["Present"] = "present";
})(StringChoice || (StringChoice = {}));
export function enumTruthiness(value, text) {
    if (value) {
        const refined = value;
    }
    else {
        const refined = value;
    }
    if (text) {
        const refined = text;
    }
    else {
        const refined = text;
    }
    return [value || "fallback", text || "fallback"];
}
export function brandedPrimitiveTypeof(value) {
    if (typeof value === "function") {
        const impossible = value;
    }
}


//// [negatedRefinementIntersections.d.ts]
type Falsy = "" | 0 | 0n | false | null | undefined;
export declare function truthy<T>(value: T): (T & not null & not "" & not 0 & not 0n & not false) | undefined;
export declare function falsy<T>(value: T): (T & null) | (T & "") | (T & 0) | (T & 0n) | (T & false) | undefined;
export declare function nullable<T>(value: T): T;
export declare function nullish<T>(value: T): (T & (null | undefined)) | (T & {});
export declare function primitive<T>(value: T): T;
export declare function exhaustive(value: unknown): number;
export declare function excludedFalsy(value: not Falsy): {
    negated: false;
    fallback: not undefined & not null & not "" & not 0 & not 0n & not false;
};
export declare function stringBranches(value: string): string;
export declare function primitiveBranches(value: number | bigint | boolean | undefined): number | bigint | boolean | undefined;
export declare function taggedString(value: string & {
    readonly tag: unique symbol;
}): string;
export declare function optionalDiscriminant(value: {
    error: Error;
    result?: never;
} | {
    error?: never;
    result: string;
}): string;
export declare function callable<T extends (() => void) | number, U extends {
    value: string;
} | number>(value: T | U): string | T | U;
export declare function optionalArray<T extends unknown[] | undefined>(value: T): (T & {})[number][] | undefined;
export declare function logicalOperators<T>(value: T): {
    and: number;
    or: T & not undefined & not null & not "" & not 0 & not 0n & not false;
} | undefined;
export declare function compoundAssignments(value: number, holder: {
    value?: number;
}): number | undefined;
export declare function rejoinedUnknown(value: unknown): true;
export declare function rejoinedTypeofTruthiness(value: unknown, condition: boolean): true;
export declare function nonCallable<T>(value: T): (T & not Function) | undefined;
export declare function typeofDefault<T>(value: T): (T & not string & not number) | undefined;
declare enum NumberChoice {
    Empty = 0,
    First = 1,
    Second = 2
}
declare enum StringChoice {
    Empty = "",
    Present = "present"
}
export declare function enumTruthiness(value: NumberChoice, text: StringChoice): (string | NumberChoice.First | NumberChoice.Second)[];
export declare function brandedPrimitiveTypeof(value: number & {
    brand: "number";
}): void;
export {};
