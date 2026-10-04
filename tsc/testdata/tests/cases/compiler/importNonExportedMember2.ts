// @module: commonjs
// @target: es2015
// @Filename: a.ts
export {}
interface Foo {}

// @Filename: b.ts
import { Foo } from './a';
