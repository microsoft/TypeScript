// @declaration: true

// @Filename: a.ts
export class A {}

// @Filename: b.ts
export type * from './a';

// @Filename: c.ts
export type * as ns from './a';

// @Filename: d.ts
import { A } from './b';
A;

// @Filename: e.ts
import { ns } from './c';
ns.A;
