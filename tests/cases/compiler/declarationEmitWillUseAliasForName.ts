// @declaration: true
// @filename: a.ts
export interface I { x: number; }
export type J = I;

// @filename: b.ts
import { J } from './a';
export const f = (): J => ({ x: 0 });
