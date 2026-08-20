// @strict: true
// @declaration: true

export function A(a: number): void;
export function A(a: string): void;
export function A(a: number | string) {}
A.a = 1;
