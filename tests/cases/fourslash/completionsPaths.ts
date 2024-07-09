/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /node_modules/x/foo.d.ts
////not read

// @Filename: /node_modules/x/bar.d.ts
////not read

// @Filename: /src/node_modules/y/index.d.ts
////not read

// @Filename: /src/a.ts
////import {} from "/*1*/";

// @Filename: /src/folder/b.ts
////import {} from "x//*2*/";

// @Filename: /src/folder/c.ts
////const foo = require("x//*3*/");

// @Filename: /src/folder/4.ts
////const foo = require(`x//*4*/`);

verify.completions(
    {
        marker: "1",
        exact: ["y", "x"].map(name => ({ name, kind: "directory" })),
        isNewIdentifierLocation: true,
    },
    {
        marker: ["2", "3", "4"],
        exact: ["bar", "foo"].map(name => ({ name, kind: "script", kindModifiers: ".d.ts" })),
        isNewIdentifierLocation: true,
    },
);
