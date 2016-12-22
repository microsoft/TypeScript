// @noImplicitReferences: true
// @currentDirectory: /
// @noImplicitAny: true
// This tests that `--noImplicitAny` disables untyped modules.

// @filename: /node_modules/foo/lib/foo.js
This file is not processed.

// @filename: /node_modules/foo/package.json
{
    "main": "lib/foo"
}

// @filename: /a.ts
import * as foo from "foo";
