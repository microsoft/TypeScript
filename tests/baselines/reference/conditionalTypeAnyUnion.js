//// [tests/cases/compiler/conditionalTypeAnyUnion.ts] ////

//// [conditionalTypeAnyUnion.ts]
// repro from #52568

type Spec = any extends object ? any : string;

type WithSpec<T extends number> = T

type R = WithSpec<Spec> // should not error

//// [conditionalTypeAnyUnion.js]
// repro from #52568
