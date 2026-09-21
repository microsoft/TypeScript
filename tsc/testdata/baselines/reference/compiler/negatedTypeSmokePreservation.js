//// [tests/cases/compiler/negatedTypeSmokePreservation.ts] ////

//// [negatedTypeSmokePreservation.ts]
export function repeatedComparison(value: string) {
    if (value === "first") return 1;
    if (value === "first") return 2;
    return 3;
}

export function repeatedTypeof(value: { text: unknown }) {
    if (typeof value.text === "string") return value.text.trim();
    if (typeof value.text === "string") return value.text.trim();
    return "";
}

export function repeatedCase(value: number) {
    if (value === 25) return;
    switch (value) {
        case 25: return;
    }
}

export function numericToken(value: number) {
    if (value === 0) return value;
    if (value === 1 || value === 2) {
        let copy = value;
        copy = 3;
        return copy;
    }
    return value;
}

export function bigintToken(value: bigint) {
    if (value === 0n) return value;
    if (value === 1n || value === 2n) {
        let copy = value;
        copy = 3n;
        return copy;
    }
    return value;
}

export function declaredLiteral(value: "first" | "second" | "third") {
    if (value === "first") return;
    let copy = value;
    copy = "fourth";
    return copy;
}

export function explicitBounds(value: not string) {
    if (value === null) {
        const result: null = value;
        return result;
    }
    if (value === undefined) {
        const result: undefined = value;
        return result;
    }
    if (typeof value === "string") {
        const result: never = value;
        return result;
    }
    return value;
}

export function symbolValue(value: unknown): symbol | undefined {
    if (typeof value === "boolean" || typeof value === "number") return;
    if (typeof value === "symbol") return value;
}

export function permission(input: { mode: unknown }): { mode?: "read" | "write" } {
    const mode = input.mode;
    if (mode !== undefined && mode !== "read" && mode !== "write") throw new Error();
    return mode === undefined ? {} : { mode };
}

export function release(input: { asset: unknown }) {
    return (typeof input.asset === "string" || input.asset === null) &&
        (input.asset === null || /^asset/.test(input.asset));
}

export function notString(value: unknown) {
    return typeof value !== "string";
}

export function inferredContainer(value: unknown) {
    if (typeof value === "string") return undefined;
    return { value, values: [value] };
}

export function matchingLiteral(value: unknown): "read" | "write" {
    if (typeof value === "undefined") return "read";
    if (value === "read" || value === "write") return value;
    throw new Error();
}

//// [negatedTypeSmokePreservation.js]
export function repeatedComparison(value) {
    if (value === "first")
        return 1;
    if (value === "first")
        return 2;
    return 3;
}
export function repeatedTypeof(value) {
    if (typeof value.text === "string")
        return value.text.trim();
    if (typeof value.text === "string")
        return value.text.trim();
    return "";
}
export function repeatedCase(value) {
    if (value === 25)
        return;
    switch (value) {
        case 25: return;
    }
}
export function numericToken(value) {
    if (value === 0)
        return value;
    if (value === 1 || value === 2) {
        let copy = value;
        copy = 3;
        return copy;
    }
    return value;
}
export function bigintToken(value) {
    if (value === 0n)
        return value;
    if (value === 1n || value === 2n) {
        let copy = value;
        copy = 3n;
        return copy;
    }
    return value;
}
export function declaredLiteral(value) {
    if (value === "first")
        return;
    let copy = value;
    copy = "fourth";
    return copy;
}
export function explicitBounds(value) {
    if (value === null) {
        const result = value;
        return result;
    }
    if (value === undefined) {
        const result = value;
        return result;
    }
    if (typeof value === "string") {
        const result = value;
        return result;
    }
    return value;
}
export function symbolValue(value) {
    if (typeof value === "boolean" || typeof value === "number")
        return;
    if (typeof value === "symbol")
        return value;
}
export function permission(input) {
    const mode = input.mode;
    if (mode !== undefined && mode !== "read" && mode !== "write")
        throw new Error();
    return mode === undefined ? {} : { mode };
}
export function release(input) {
    return (typeof input.asset === "string" || input.asset === null) &&
        (input.asset === null || /^asset/.test(input.asset));
}
export function notString(value) {
    return typeof value !== "string";
}
export function inferredContainer(value) {
    if (typeof value === "string")
        return undefined;
    return { value, values: [value] };
}
export function matchingLiteral(value) {
    if (typeof value === "undefined")
        return "read";
    if (value === "read" || value === "write")
        return value;
    throw new Error();
}


//// [negatedTypeSmokePreservation.d.ts]
export declare function repeatedComparison(value: string): 1 | 2 | 3;
export declare function repeatedTypeof(value: {
    text: unknown;
}): any;
export declare function repeatedCase(value: number): void;
export declare function numericToken(value: number): number;
export declare function bigintToken(value: bigint): bigint;
export declare function declaredLiteral(value: "first" | "second" | "third"): "second" | "third" | undefined;
export declare function explicitBounds(value: not string): (not string & not null & not undefined) | null | undefined;
export declare function symbolValue(value: unknown): symbol | undefined;
export declare function permission(input: {
    mode: unknown;
}): {
    mode?: "read" | "write";
};
export declare function release(input: {
    asset: unknown;
}): boolean;
export declare function notString(value: unknown): boolean;
export declare function inferredContainer(value: unknown): {
    value: unknown;
    values: unknown[];
} | undefined;
export declare function matchingLiteral(value: unknown): "read" | "write";
