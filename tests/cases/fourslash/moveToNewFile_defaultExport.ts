/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export default function f() { }|]
////f();

// @Filename: /user.ts
////import f from "./a";
////f();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import f from "./f";

f();`,

        "/f.ts":
`export default function f() { }`,

        "/user.ts":
`import f from "./f";
f();`,
    },
});
