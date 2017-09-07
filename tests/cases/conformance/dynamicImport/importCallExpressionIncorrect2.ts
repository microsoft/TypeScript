// @module: esnext
// @target: esnext
// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
var x = import { foo } from './0';