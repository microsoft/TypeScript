// @strict: true
// @noEmit: true

type Obj = {
    [s: string]: number;
};

type foo = <T>(target: { [K in keyof T]: T[K] }) => void;
type bar = <U extends string[]>(source: { [K in keyof U]: Obj[K] }) => void;

declare let f: foo;
declare let b: bar;
b = f;