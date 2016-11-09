// @noImplicitReferences: true
// @currentDirectory: /
// @noImplicitAny: true
// This tests that `--noImplicitAny` disables untyped modules.

// @filename: /node_modules/foo/index.js
This file is not processed.

// @filename: /a.ts
import * as foo from "foo";
