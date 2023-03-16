// @declaration: true
// @outDir: out
// @checkJs: true
// @allowJs: true

// @Filename: a.js
export class A {}

// @Filename: b.js
export type * from './a';

// @Filename: c.js
import { A } from './b';
A;
