// @strict: true, false
// @target: esnext
// @declaration: true

export function comboProtection(combo: { protection: unknown }): number | boolean | undefined {
    return typeof combo.protection === "boolean" || typeof combo.protection === "number"
        ? combo.protection : undefined;
}

export function scalar(value: unknown) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        const result: string | number | boolean = value;
        return result;
    }
    return null;
}

export function sequential(value: unknown) {
    if (typeof value === "boolean") return +value;
    if (typeof value === "string") return parseFloat(value);
    if (typeof value === "bigint") return value + 1n;
    if (typeof value === "number") return value.toFixed();
    if (typeof value === "object" && value !== null) return Object.keys(value);
    if (typeof value === "function") return value();
    return undefined;
}

export function nullableString(value: unknown): string | null {
    if (value === null || typeof value === "string") return value;
    return null;
}

export function literalChoice(value: unknown): "read" | "write" | undefined {
    return value === "read" || value === "write" ? value : undefined;
}

export function trimmed(value: unknown) {
    if (typeof value === "number") return String(value);
    if (typeof value !== "string") return "";
    if (value === "1" || value === "2") return value;
    return value.trim();
}