// repro https://github.com/microsoft/TypeScript/issues/55091

let Infinity = 3;
let NaN = 5;

export enum A {
    X = 1 / 0,
    Y = -1 / 0,
    B = 0 / 0,
}
