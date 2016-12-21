// @noImplicitReferences: true
// @currentDirectory: /
// This tests that importing from a JS file globally works in an untyped way.
// (Assuming we don't have `--noImplicitAny` or `--allowJs`.)

// @filename: /node_modules/foo/lib/foo.js
This file is not processed.

// @filename: /node_modules/foo/package.json
{
    "main": "lib/foo"
}

// @filename: /a.ts
import * as foo from "foo";
foo.bar();
