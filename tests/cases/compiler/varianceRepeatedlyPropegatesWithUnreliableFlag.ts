type A = { a: number };
type B = { b: number };
type X<T> = ({ [K in keyof T]: T[K] } & Record<string, void>)[keyof T];
type P1<T> = { data: X<T> };
type P2<T> = { data: X<T> };

interface I<T> {
    fn<K extends keyof T>(p1: P1<Pick<T, K>>, p2: P2<Pick<T, K>>): void;
}

const i: I<A & B> = null as any;
const p2: P2<A> = null as any;

// Commenting out the below line will remove the error on the `const _i: I<A> = i;`
i.fn(null as any, p2);

const _i: I<A> = i;