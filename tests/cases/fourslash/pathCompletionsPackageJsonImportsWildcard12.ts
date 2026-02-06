/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "name": "repo",
////   "imports": {
////     "#foo/_*/suffix": "./src/*.ts"
////   }
//// }

// @Filename: /src/b.ts
////export const x = 0;

// @Filename: /src/dir/x.ts
/////export const x = 0;

// @Filename: /src/a.ts
////import {} from "#foo//*0*/";
////import {} from "#foo/dir//*1*/"; // invalid
////import {} from "#foo/_/*2*/";
////import {} from "#foo/_dir//*3*/";

verify.completions(
    {
        marker: "0",
        exact: [
            { name: "#foo/_a/suffix", kind: "script" },
            { name: "#foo/_b/suffix", kind: "script" },
            { name: "#foo/_dir/suffix", kind: "directory" },
        ],
        isNewIdentifierLocation: true,
    },
    {
        marker: "1",
        exact: [
            { name: "#foo/_a/suffix", kind: "script" },
            { name: "#foo/_b/suffix", kind: "script" },
            { name: "#foo/_dir/suffix", kind: "directory" },
        ],
        isNewIdentifierLocation: true,
    },
    {
        marker: "2",
        exact: [
            { name: "a", kind: "script" },
            { name: "b", kind: "script" },
            { name: "dir", kind: "directory" },
        ],
        isNewIdentifierLocation: true,
    },
    {
        marker: "3",
        exact: { name: "x", kind: "script" },
        isNewIdentifierLocation: true,
    },
);
