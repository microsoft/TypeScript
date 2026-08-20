// @module: nodenext
// @target: esnext
// @strict: true
// @noEmit: true
// @filename: foo.d.ts
declare function foo(): void;
declare namespace foo {}
export = foo;
// @filename: index.ts
import * as foo from "./foo";
foo()
