// @strict: true
// @filename: file1.ts
// @ts-strict
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

// @filename: file2.ts
// @ts-strict true
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

// @filename: file3.ts
// @ts-strict false
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

// @filename: file4.ts
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
