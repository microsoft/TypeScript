/// <reference path='fourslash.ts' />

//// declare module "foo" {
////     const a = "foo"
////     export = a
//// }
//// const x: import("foo") = import("foo");

verify.codeFix({
    description: "Add missing 'typeof'",
    newFileContent: `declare module "foo" {
    const a = "foo"
    export = a
}
const x: typeof import("foo") = import("foo");`
});
