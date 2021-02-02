// @strict: true
// @filename: one.ts
declare const y: never[] | string[];
export const yThen = y.map(item => item.length);
// @filename: two.ts
declare const y: number[][] | string[];
export const yThen = y.map(item => item.length);
