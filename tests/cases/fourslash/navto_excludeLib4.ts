/// <reference path="fourslash.ts"/>

// @filename: /node_modules/bar/index.d.ts
//// import { someOtherName } from "./baz";
//// export const [|someName: number|];
// @filename: /node_modules/bar/baz.d.ts
//// export const someOtherName: string;

const [some] = test.ranges();

verify.navigateTo({
    pattern: "some",
    excludeLibFiles: true,
    fileName: "/node_modules/bar/index.d.ts",
    expected: [
        {
            name: "someName",
            kind: "const",
            kindModifiers: "export,declare",
            range: some,
            matchKind: "prefix",
        },
    ],
});