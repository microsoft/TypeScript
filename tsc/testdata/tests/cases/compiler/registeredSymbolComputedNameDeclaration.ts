// @target: es2015
// @declaration: true

export const key = Symbol.for("abc");
export function getKey(): typeof key { return key; }

export const value = {
    ordinary: 1,
    [getKey()]: "text",
    [Symbol.for("other")]: true,
};

export const readonlyValue = { [getKey()]: "fixed" } as const;
