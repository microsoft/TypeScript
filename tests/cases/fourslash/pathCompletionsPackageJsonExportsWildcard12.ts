/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/foo/package.json
//// {
////   "name": "foo",
////   "exports": {
////     "./bar/_*/suffix": "./dist/*.js"
////   }
//// }

// @Filename: /node_modules/foo/dist/b.d.ts
////export const x = 0;

// @Filename: /node_modules/foo/dist/dir/x.d.ts
/////export const x = 0;

// @Filename: /a.mts
////import {} from "foo/bar//*0*/";
////import {} from "foo/bar/dir//*1*/"; // invalid
////import {} from "foo/bar/_/*2*/";
////import {} from "foo/bar/_dir//*3*/";

verify.completions(
    {
        marker: "0",
        exact: [
            { name: "bar/_b/suffix", kind: "script" },
            { name: "bar/_dir/suffix", kind: "directory" },
        ],
        isNewIdentifierLocation: true,
    },
    {
        marker: "1",
        exact: [
            { name: "bar/_b/suffix", kind: "script" },
            { name: "bar/_dir/suffix", kind: "directory" },
        ],
        isNewIdentifierLocation: true,
    },
    {
        marker: "2",
        exact: [
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
