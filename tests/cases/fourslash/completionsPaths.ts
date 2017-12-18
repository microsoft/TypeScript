/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /node_modules/x/foo.d.ts
////not read

// @Filename: /node_modules/x/bar.d.ts
////not read

// @Filename: /src/node_modules/y/index.d.ts
////not read

// @Filename: /src/a.ts
////import {} from "[|/*1*/|]";

// @Filename: /src/folder/b.ts
////import {} from "x/[|/*2*/|]";

const [r0, r1] = test.ranges();
verify.completionsAt("1", [{ name: "y", replacementSpan: r0 }, { name: "x", replacementSpan: r0 }]);
verify.completionsAt("2", [{ name: "bar", replacementSpan: r1 }, { name: "foo", replacementSpan: r1 }]);
