const a: Required<{ a?: 1; x: 1 }> = { a: 1, x: 1 };
const b: Required<{ b?: 1; x: 1 }> = { b: 1, x: 1 };
export let A = a;
export let B = b;
A = b; // Should Error
B = a; // Should Error

a.b; // Property 'b' does not exist on type 'Required<{ a?: 1; x: 1; }>'.
b.a; // Property 'a' does not exist on type 'Required<{ b?: 1; x: 1; }>'.

interface Foo<T> {
    a: Required<T>;
}
const aa: Foo<{ a?: 1; x: 1 }> = { a: { a: 1, x: 1 } };
const bb: Foo<{ b?: 1; x: 1 }> = { a: { b: 1, x: 1 } };
export let AA = aa;
export let BB = bb;
AA = bb; // Should Error
BB = aa; // Should Error

aa.a.b; // Property 'b' does not exist on type 'Required<{ a?: 1; x: 1; }>'.
bb.a.a; // Property 'a' does not exist on type 'Required<{ b?: 1; x: 1; }>'.