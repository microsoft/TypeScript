// @module: esnext
// @target: esnext
// @isolatedModules: true
// @noTypesAndSymbols: true

const enum E {
    A = 1,
    B = A + (1 as number),
}

export const value = E.A;
