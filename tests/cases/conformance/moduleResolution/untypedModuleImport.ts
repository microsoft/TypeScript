// @noImplicitReferences: true
// @currentDirectory: /
// This tests that importing from a JS file globally works in an untyped way.
// (Assuming we don't have `--noImplicitAny` or `--allowJs`.)

// @filename: /node_modules/foo/index.js
This file is not processed.

// @filename: /a.ts
import * as foo from "foo";
foo.bar();

// @filename: /b.ts
import foo = require("foo");
foo();

// @filename: /c.ts
import foo, { bar } from "foo";
import "./a";
import "./b";
foo(bar());
