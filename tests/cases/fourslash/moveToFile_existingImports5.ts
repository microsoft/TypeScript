/// <reference path='fourslash.ts' />

// @filename: /a.ts
////export class Bar {}
////export class Baz {}

// @filename: /b.ts
////import { Bar, Baz } from "./a";
////
////[|const Foo = {
////    bar: Bar,
////    baz: Baz,
////}|]
////
////export function fn(name: keyof typeof Foo) {
////    return Foo[name];
////}

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`export class Bar {}
export class Baz {}

export const Foo = {
    bar: Bar,
    baz: Baz,
};
`,
        "/b.ts":
`import { Foo } from "./a";

export function fn(name: keyof typeof Foo) {
    return Foo[name];
}`,
    },
    interactiveRefactorArguments: { targetFile: "/a.ts" },
});
