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
    { marker: "1", exact: "package", isNewIdentifierLocation: true },
    { marker: "2", exact: ["lib", "ns", "user", "node_modules"], isNewIdentifierLocation: true },
    { marker: "3", exact: ["package"], isNewIdentifierLocation: true },
);
