interface I1 {
    a: number;
}

type T1 = {
    a: "a" | "b";
}

type T2 = (x: string) => void;

const t1 = { a: 1 } satisfies I1; // Ok
const t2 = { a: 1, b: 1 } satisfies I1; // Error
const t3 = { } satisfies I1; // Error

const t4: T1 = { a: "a" } satisfies T1; // Ok
const t5 = (m => m.substring(0)) satisfies T2; // Ok

const t6 = [1, 2] satisfies [number, number];

interface A {
    a: string
}
let t7 = { a: 'test' } satisfies A;
let t8 = { a: 'test', b: 'test' } satisfies A;
