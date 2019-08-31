// @strictNullChecks: true

let a: () => void | undefined;
a; // Error did you mean to paren this function type

function b (): void | undefined {}
let c: typeof b;
c;

type Undefined = undefined
let d: () => void | Undefined;
d;

let e: () => string | void | number | object | undefined;
e; // Error did you mean to paren...

let f: () => void;
f;

let g: () => undefined;
g;

type T1 = undefined | string;
type T2 = undefined | void;
let h: () => T1 & T2;
h;

type T3 = void | undefined;
let i: () => T3;
i;

type T4 = () => void | undefined;
let j: T4;
j; // Error did you mean to paren...

type T5 = () => void
let k: T5 | undefined
j;
