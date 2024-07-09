// @Filename: /a.ts
class A { a!: string }
export type { A };

// @Filename: /b.ts
import * as types from './a';
types.A;
const { A } = types;