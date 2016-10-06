// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// @noImplicitAny: true
// This tests that `--noImplicitAny` disables untyped modules.

// @filename: /tsconfig.json
{}

// @filename: /node_modules/foo/package.json
{}

// @filename: /a.ts
import * as foo from "foo";
