// @declaration: true
// @strict: true
// @exactOptionalPropertyTypes: true,false
type InexactOptionals<A> = {
    [K in keyof A as undefined extends A[K] ? K : never]?: undefined extends A[K]
    ? A[K] | undefined
    : A[K];
} & {
    [K in keyof A as undefined extends A[K] ? never : K]: A[K];
};

type In = {
    foo?: string;
    bar: number;
    baz: undefined;
}

type Out = InexactOptionals<In>

const foo = <A = {}>() => (x: Out & A) => null

export const baddts = foo()
