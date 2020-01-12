// @importsNotUsedAsValues: preserve

// @Filename: a.ts
export type A = {};

// @Filename: b.ts
export class B {}

// @Filename: c.ts
import { A } from './a';
import { B } from './b';

let b: B;
