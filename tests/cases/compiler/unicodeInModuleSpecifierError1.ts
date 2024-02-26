// @module: commonjs
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: 🦁.ts
export const foo = "bar";
const baz = "baz";

// @Filename: main.ts
import { bar, baz } from './🦁.ts';
export { bar, baz } from './🦁.ts';
