/// <reference path="fourslash.ts" />

// @Filename: /ns.ts
////export namespace Foo {
////    export namespace Bar {
////        export class Baz {}
////    }
////}
// @Filename: /node_modules/package/index.ts
////export namespace Foo {
////    export namespace Bar {
////        export class Baz {}
////    }
////}
// @Filename: /usage.ts
////type A = typeof import("p/*1*/");
////type B = typeof import(".//*2*/");
verify.completionsAt("1", ["package"], { isNewIdentifierLocation: true });
verify.completionsAt("2", ["lib", "ns", "node_modules"], { isNewIdentifierLocation: true });
