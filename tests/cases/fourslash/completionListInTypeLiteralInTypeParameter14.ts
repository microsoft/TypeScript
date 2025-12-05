/// <reference path="fourslash.ts" />

////interface Foo {
////   one: string;
////   two: number;
////}
////declare function f<T extends Foo>(x: TemplateStringsArray): void;
////f<{/*0*/}>``;

verify.completions({ marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true });
