// @declaration: true
// @target: es6
// @filename: variables.ts
const x = "";
export function one() {
    return {} as typeof x;
}

export function two() {
    const y = "";
    return {} as typeof y;
}

export function three() {
    type Z = string;
    return {} as Z;
}