// @strict: true
// @target: esnext
// @declaration: true

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