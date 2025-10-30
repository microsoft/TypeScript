/// <reference path="fourslash.ts" />

////interface Foo {
////   one: string;
////   two: number;
////}
////
////declare function decorator<T extends Foo>(originalMethod: unknown, _context: unknown): never
////
////class {
////   @decorator<{/*0*/}>
////   method() {}
////}

verify.completions({ marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true });
