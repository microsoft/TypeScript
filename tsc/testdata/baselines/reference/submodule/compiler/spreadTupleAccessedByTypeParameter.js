//// [tests/cases/compiler/spreadTupleAccessedByTypeParameter.ts] ////

//// [spreadTupleAccessedByTypeParameter.ts]
export function test<N extends number>(singletons: ["a"][], i: N) {
  const singleton = singletons[i];
  const [, ...rest] = singleton;

  return rest;
}


//// [spreadTupleAccessedByTypeParameter.js]
export function test(singletons, i) {
    const singleton = singletons[i];
    const [, ...rest] = singleton;
    return rest;
}
