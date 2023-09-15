/// <reference path="fourslash.ts"/>

// @filename: /index.ts
//// [|function parseInt(s: string): number {}|]

const [local] = test.ranges();

verify.navigateTo({
    pattern: "parseInt",
    excludeLibFiles: true,
    expected: [
        {
            name: "parseInt",
            kind: "function",
            range: local,
            matchKind: "exact",
        },
    ],
});