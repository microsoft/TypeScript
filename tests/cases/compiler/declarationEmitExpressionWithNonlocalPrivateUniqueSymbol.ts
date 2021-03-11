// @declaration: true
// @filename: a.ts
type AX = { readonly A: unique symbol };
export const A: AX = 0 as any;
// @filename: b.ts
import { A } from './a';
export const A1 = A;