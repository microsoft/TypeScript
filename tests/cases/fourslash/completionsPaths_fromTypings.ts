/// <reference path="fourslash.ts" />

// @Filename: /node_modules/@types/foo/index.d.ts
////

// @Filename: /node_modules/@types/foo/bar.d.ts
////

// @Filename: /a.ts
////import {} from "unrelated//*0*/";
////import {} from "foo//*1*/";
/////// <reference types="foo//*2*/" />

verify.completions(
    { marker: "0", exact: [], isNewIdentifierLocation: true },
    { marker: "1", exact: ["bar", "index"], isNewIdentifierLocation: true },
    { marker: "2", exact: ["bar", "index"], isNewIdentifierLocation: true },
);
