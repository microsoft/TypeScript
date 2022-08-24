// @filename: file1.ts
// @ts-strict
// @ts-strictNullChecks false
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

export class A {
    prop: string;
    constructor() {}
}

declare var c: { member?: string };
c.member.charAt(0);
