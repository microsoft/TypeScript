// @esModuleInterop: true
// @Filename: foo.d.ts
declare function foo(): void;
declare namespace foo {}
export = foo;

// @Filename: index.ts
import * as foo from "./foo";
foo.default;
