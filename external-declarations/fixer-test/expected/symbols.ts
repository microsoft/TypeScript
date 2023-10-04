
export const a: unique symbol = Symbol();

export function foo(): symbol {
    return Symbol();
}

export const z: {
    z: symbol;
} = {
    z: Symbol(),
};

export const z2: {
    readonly z: symbol;
} = {
    z: Symbol()
} as const;