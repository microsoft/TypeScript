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

const [r0, r1, r2, r3] = test.ranges();
verify.completionsAt("1", ["y", "x"], { isNewIdentifierLocation: true });
verify.completionsAt(["2", "3", "4"], ["bar", "foo"], { isNewIdentifierLocation: true });
