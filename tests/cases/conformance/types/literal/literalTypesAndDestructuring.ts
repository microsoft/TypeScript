// @strict: true

declare let x: { a: 0 | 1 | undefined };

let { a: a1 } = x;
let { a: a2 = 0 } = x;
let { a: a3 = 2 } = x;
let { a: a4 = 2 as const } = x;

let b1 = x.a;
let b2 = x.a ?? 0;
let b3 = x.a ?? 2;
let b4 = x.a ?? 2 as const;

// Repro from #35693

interface Foo {
  bar: 'yo' | 'ha' | undefined;
}

let { bar = 'yo' } = {} as Foo;

bar;  // "yo" | "ha"
