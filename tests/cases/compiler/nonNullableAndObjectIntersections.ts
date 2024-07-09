// @strict: true, false

// These should all resolve to never

type T0 = NonNullable<null>;
type T1 = NonNullable<undefined>;
type T2 = null & {};
type T3 = undefined & {};
type T4 = null & undefined;
type T6 = null & { a: string } & {};

// Repro from #50519

type NonNullableNew<T> = T & {};
type NonNullableOld<T> = T extends null | undefined ? never : T;

type TestNew = NonNullableNew<null>;
type TestOld = NonNullableOld<null>;
