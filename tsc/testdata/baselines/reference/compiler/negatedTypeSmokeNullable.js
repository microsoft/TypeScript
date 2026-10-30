//// [tests/cases/compiler/negatedTypeSmokeNullable.ts] ////

//// [negatedTypeSmokeNullable.ts]
export function nullable(value: unknown): string | null {
    if (typeof value === "string" || value === null) return value;
    return null;
}

export function reply(value: unknown, conditional: boolean): "OK" | null {
    if (value === "OK" || (conditional && value === null)) return value;
    throw new Error();
}

export function optional(value: unknown): number | undefined {
    if (typeof value === "number" || value === undefined) return value;
    return undefined;
}

export function nullish(value: unknown): boolean | null | undefined {
    if (typeof value === "boolean" || value == null) return value;
    return undefined;
}

export function selected(value: unknown): "read" | "write" | undefined {
    if (value === undefined) return undefined;
    if (value === "read" || value === "write") return value;
    throw new Error();
}

export function phase(value: unknown): "read" | "write" {
    if (value === undefined || value === false) return "read";
    if (value === "read" || value === "write") return value;
    throw new Error();
}

export function property(input: { path: unknown }) {
    const path = typeof input.path === "string" || input.path === null ? input.path : undefined;
    if (path === undefined) throw new Error();
    const result: { path: string | null } = { path };
    return result;
}

//// [negatedTypeSmokeNullable.js]
export function nullable(value) {
    if (typeof value === "string" || value === null)
        return value;
    return null;
}
export function reply(value, conditional) {
    if (value === "OK" || (conditional && value === null))
        return value;
    throw new Error();
}
export function optional(value) {
    if (typeof value === "number" || value === undefined)
        return value;
    return undefined;
}
export function nullish(value) {
    if (typeof value === "boolean" || value == null)
        return value;
    return undefined;
}
export function selected(value) {
    if (value === undefined)
        return undefined;
    if (value === "read" || value === "write")
        return value;
    throw new Error();
}
export function phase(value) {
    if (value === undefined || value === false)
        return "read";
    if (value === "read" || value === "write")
        return value;
    throw new Error();
}
export function property(input) {
    const path = typeof input.path === "string" || input.path === null ? input.path : undefined;
    if (path === undefined)
        throw new Error();
    const result = { path };
    return result;
}


//// [negatedTypeSmokeNullable.d.ts]
export declare function nullable(value: unknown): string | null;
export declare function reply(value: unknown, conditional: boolean): "OK" | null;
export declare function optional(value: unknown): number | undefined;
export declare function nullish(value: unknown): boolean | null | undefined;
export declare function selected(value: unknown): "read" | "write" | undefined;
export declare function phase(value: unknown): "read" | "write";
export declare function property(input: {
    path: unknown;
}): {
    path: string | null;
};
