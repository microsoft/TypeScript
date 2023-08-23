// @strict: true
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/54809

const s = "X";

export const expr = () => {}
expr[s] = 0

export const expr2 = function () {}
expr2[s] = 0
