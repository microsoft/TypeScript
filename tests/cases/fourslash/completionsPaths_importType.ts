/// <reference path="fourslash.ts" />

// @allowJs: true
// @moduleResolution: node

// @Filename: /ns.ts
////file content not read

// @Filename: /node_modules/package/index.ts
////file content not read

// @Filename: /usage.ts
////type A = typeof import("p/*1*/");
////type B = import(".//*2*/");

// @Filename: /user.js
/////** @type {import("/*3*/")} */

verify.completions(
    {
        marker: ["1", "3"],
        exact: { name: "package", kind: "directory" },
        isNewIdentifierLocation: true,
    },
    {
        marker: "2",
        exact: [
            { name: "lib", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.decorators", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.decorators.legacy", kind: "script", kindModifiers: ".d.ts" },
            { name: "ns", kind: "script", kindModifiers: ".ts" },
            { name: "user", kind: "script", kindModifiers: ".js" },
            { name: "node_modules", kind: "directory" },
        ],
        isNewIdentifierLocation: true
    },
);
