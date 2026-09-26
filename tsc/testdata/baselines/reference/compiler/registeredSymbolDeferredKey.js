//// [tests/cases/compiler/registeredSymbolDeferredKey.ts] ////

//// [registeredSymbolDeferredKey.ts]
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




//// [registeredSymbolDeferredKey.d.ts]
export declare function make<K extends string>(key: K): RegisteredSymbol<K>;
export declare function unreachable(key: never): never;
export declare function read<K extends string>(first: K, second: K): "first";
