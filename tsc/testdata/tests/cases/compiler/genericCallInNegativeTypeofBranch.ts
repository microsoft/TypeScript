// @strict: true

declare function identity<T>(value: T): T;
function normalize(value: unknown) {
    return typeof value === "string" ? value : identity(value);
}
