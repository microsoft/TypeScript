// @module: es2015
// @esModuleInterop: false

// @Filename: a.ts
class Foo {}
export = Foo;

// @Filename: b.ts
import { Foo } from './a';