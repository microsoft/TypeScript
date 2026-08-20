// @declaration: true

export function A() {
    return 'A';
}

export function B() {
    return 'B';
}

export enum C {
    C
}

A.a = C;
A.b = C;

B.c = C;
