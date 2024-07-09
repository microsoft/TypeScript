// @strict: true

// Repros from #33872

export interface CalcObj<O> {
    read: (origin: O) => CalcValue<O>;
}

export type CalcValue<O> = CalcObj<O>;

function foo<O>() {
    const unk: CalcObj<unknown> = { read: (origin: unknown) => unk }
    const x: CalcObj<O> = unk;
}

type A<T> = B<T>;

interface B<T> {
    prop: A<T>;
}

declare let a: A<number>;
declare let b: A<3>;
 
b = a;
