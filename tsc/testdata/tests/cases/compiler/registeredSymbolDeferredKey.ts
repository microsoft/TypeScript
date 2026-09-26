// @target: es2015
// @strict: true
// @noUncheckedIndexedAccess: true
// @declaration: true
// @emitDeclarationOnly: true

export function make<K extends string>(key: K) {
    const registered = Symbol.for(key);
    const widened: symbol = registered;
    return registered;
}

export function unreachable(key: never): never {
    return Symbol.for(key);
}

export function read<K extends string>(first: K, second: K) {
    const firstKey = Symbol.for(first);
    const record = { [firstKey]: "first" } as const;
    const secondKey = Symbol.for(second);
    const value: "first" = record[secondKey];
    return value;
}

read<"a" | "b">("a", "b");
