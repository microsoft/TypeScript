/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /ns.ts
////file content not read
// @Filename: /node_modules/package/index.ts
////file content not read
// @Filename: /usage.ts
////type A = typeof import("p/*1*/");
////type B = typeof import(".//*2*/");
verify.completionsAt("1", ["package"], { isNewIdentifierLocation: true });
verify.completionsAt("2", ["lib", "ns", "node_modules"], { isNewIdentifierLocation: true });
