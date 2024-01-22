/// <reference path="fourslash.ts"/>

// @filename: /index.ts
//// import { [|someName as weirdName|] } from "bar";

// @filename: /tsconfig.json
//// {}

// @filename: /node_modules/bar/index.d.ts
//// export const someName: number;

// @filename: /node_modules/bar/package.json
//// {}


const [weird] = test.ranges();

verify.navigateTo({
    pattern: "weirdName",
    expected: [{
        name: "weirdName",
        kind: "alias",
        range: weird,
        matchKind: "exact",
    }],
});

verify.navigateTo({
    pattern: "weirdName",
    excludeLibFiles: true,
    expected: [],
});