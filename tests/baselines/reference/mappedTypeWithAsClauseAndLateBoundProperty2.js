//// [mappedTypeWithAsClauseAndLateBoundProperty2.ts]
export const thing = (null as any as { [K in keyof number[] as Exclude<K, "length">]: (number[])[K] });


//// [mappedTypeWithAsClauseAndLateBoundProperty2.js]
export const thing = null;
