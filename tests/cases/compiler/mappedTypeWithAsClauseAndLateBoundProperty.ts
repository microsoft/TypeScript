// @target: ES2020
declare let tgt2: number[];
declare let src2: { [K in keyof number[] & PropertyKey as Exclude<K, "length">]: (number[])[K] };
tgt2 = src2; // Should error
