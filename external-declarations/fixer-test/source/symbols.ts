
export const a = Symbol();

export function foo() {
    return Symbol();
}

export const z = {
    z: Symbol(),
};

export const z2 = {
    z: Symbol()
} as const;