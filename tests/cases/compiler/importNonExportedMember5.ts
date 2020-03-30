// @esModuleInterop: true
// @module: commonjs

// @Filename: a.ts
class Foo {}
export = Foo;

// @Filename: b.ts
import { Foo } from './a';