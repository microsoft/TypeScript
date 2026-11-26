// @strict: true
// @target: esnext
// @declaration: true

declare function identity<Value>(value: Value): Value;
declare function consumePrimitive(value: { value: string | number }): void;

export function nonString(value: unknown) {
    if (typeof value === "string") return undefined;
    Boolean(value);
    Object.prototype.toString.call(value);
    return identity(value);
}

export function excludedLiteral(value: unknown) {
    if (value === "missing") return undefined;
    consumePrimitive({ value });
    const copy = value;
    const invalid: string = copy;
    return copy;
}

export function operatorToken(char: string, prefix: string) {
    if (char === "&") return char;
    if (char === "<" || char === ">") {
        let operator = char;
        operator = `${prefix}${operator}`;
        operator = "other";
        return operator;
    }
    return "";
}

export function explicitNegation(value: not string) {
    return identity(value);
}