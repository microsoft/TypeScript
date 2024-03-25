// @strict: true
// @preserveConstEnums: true,false

const enum E {
    A,
    B,
    C,
}

declare const x: E;

E;
E[x];