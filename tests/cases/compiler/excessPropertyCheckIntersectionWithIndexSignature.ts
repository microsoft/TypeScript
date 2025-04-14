// @strict: true

// Repro from #51875

let x: { [x: string]: { a: 0 } } & { [x: string]: { b: 0 } };

x = { y: { a: 0 } };  // Error
x = { y: { a: 0, b: 0 } };
x = { y: { a: 0, b: 0, c: 0 } };  // Error

type A = { a: string };
type B = { b: string };

const yy: Record<string, A> & Record<string, B> = {
    foo: { a: '', b: '' },
};
