// @declaration: true
// @target: esnext

const Infinity = 0;

const enum E {
    value = 1e999,
}

export const value = E.value;
