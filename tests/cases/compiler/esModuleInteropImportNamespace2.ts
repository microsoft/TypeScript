// @esModuleInterop: true
// @Filename: foo.d.ts
declare namespace foo {
    var x: number;
}
export = foo;

// @Filename: index.ts
import * as foo from "./foo";
foo.default;
