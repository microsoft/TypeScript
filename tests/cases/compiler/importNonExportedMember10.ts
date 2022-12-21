// @esModuleInterop: false
// @module: es2015
// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: a.ts
class Foo {}
export = Foo;

// @Filename: b.js
import { Foo } from './a';