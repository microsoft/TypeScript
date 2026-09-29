// @strict: true
// @target: esnext
// @declaration: true

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