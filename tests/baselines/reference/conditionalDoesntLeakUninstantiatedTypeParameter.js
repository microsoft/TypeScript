//// [tests/cases/compiler/conditionalDoesntLeakUninstantiatedTypeParameter.ts] ////

//// [conditionalDoesntLeakUninstantiatedTypeParameter.ts]
interface Synthetic<A, B extends A> {}
type SyntheticDestination<T, U> = U extends Synthetic<T, infer V> ? V : never;
type TestSynthetic = // Resolved to T, should be `number` or an inference failure (`unknown`)
    SyntheticDestination<number, Synthetic<number, number>>;

const y: TestSynthetic = 3; // Type '3' is not assignable to type 'T'. (shouldn't error)
const z: TestSynthetic = '3'; // Type '"3""' is not assignable to type 'T'. (should not mention T)


//// [conditionalDoesntLeakUninstantiatedTypeParameter.js]
var y = 3; // Type '3' is not assignable to type 'T'. (shouldn't error)
var z = '3'; // Type '"3""' is not assignable to type 'T'. (should not mention T)
