// @target: ES2020
// @declaration: true
export const thing = (null as any as { [K in keyof number[] as Exclude<K, "length">]: (number[])[K] });
